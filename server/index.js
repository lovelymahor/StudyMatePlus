const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const crypto = require('crypto');
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const { parseFile } = require('./utils/parser');

// Ensure uploads and cache directories exist
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const CACHE_DIR = path.join(__dirname, 'cache');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR);

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file (adjustable)
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.docx', '.txt'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) return cb(new Error('Invalid file type'));
    cb(null, true);
  }
});

// OpenAI setup (optional)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  const conf = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
  openai = new OpenAIApi(conf);
}


// ─── Security Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '2mb' }));

const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));

// ─── Global rate limiter ──────────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// ─── MongoDB Connection ───────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── Schemas & Models ─────────────────────────────────────────────────────────
const feedbackSchema = new mongoose.Schema({
  studentName: String,
  university: { type: String, required: true },
  examName: { type: String, required: true },
  difficulty: { type: String, required: true },
  feedback: { type: String, required: true },
  tips: String,
  createdAt: { type: Date, default: Date.now },
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// ─── Routes ───────────────────────────────────────────────────────────────────
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('StudyMatePlus API is running ✅');
});

// Feedback Routes (existing — unchanged)
app.post(
  '/api/feedback',
  [
    body('university').trim().notEmpty().withMessage('University cannot be empty.').escape(),
    body('examName').trim().notEmpty().withMessage('Exam name cannot be empty.').escape(),
    body('difficulty').notEmpty().withMessage('Please select a difficulty.').escape(),
    body('feedback').trim().notEmpty().withMessage('Feedback cannot be empty.').escape(),
    body('studentName').trim().escape(),
    body('tips').trim().escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const newFeedback = new Feedback(req.body);
      await newFeedback.save();
      res.status(201).json({ message: 'Feedback submitted and saved successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to save feedback.', error: error.message });
    }
  }
);



// --- Syllabus upload API ---
app.post('/api/syllabus/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Validate file size and basic health
    const filePath = req.file.path;
    const stat = fs.statSync(filePath);
    if (stat.size === 0) return res.status(400).json({ error: 'Empty file' });

    // Compute hash for caching
    const hash = crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
    const cacheFile = path.join(CACHE_DIR, `${hash}.json`);
    if (fs.existsSync(cacheFile)) {
      const cached = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      return res.json({ ...cached, cached: true });
    }

    // Parse text
    let text = await parseFile(filePath, req.file.mimetype);
    if (!text || text.trim().length === 0) return res.status(400).json({ error: 'Unable to extract text from document' });

    // Call AI to generate structured summary (if OpenAI key present)
    let aiResult = null;
    if (openai) {
      // Build prompt
      const prompt = `You are an assistant that extracts structured syllabus information from raw text. Return a JSON object with keys: courseName,difficulty,modules,summary,learningOutcomes,examWeightage,moduleNotes.\nText:\n"""\n${text.slice(0, 20000)}\n"""`;

      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt,
        temperature: 0.2,
        max_tokens: 1200
      });
      const raw = response.data.choices && response.data.choices[0] && response.data.choices[0].text;
      try {
        aiResult = JSON.parse(raw);
      } catch (e) {
        aiResult = { summary: raw || '', rawAiText: raw };
      }
    } else {
      // Fallback lightweight extraction
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const title = lines[0] || 'Untitled Course';
      aiResult = {
        courseName: title,
        difficulty: 'Unknown',
        modules: Math.min(10, Math.max(1, Math.floor(lines.length / 20))),
        summary: lines.slice(0, 6).join(' '),
        learningOutcomes: [],
        examWeightage: {},
        moduleNotes: []
      };
    }

    // Save cache
    const out = { ...aiResult, parsedTextExcerpt: text.slice(0, 2000) };
    fs.writeFileSync(cacheFile, JSON.stringify(out, null, 2));

    res.json(out);
  } catch (error) {
    console.error('Syllabus upload error:', error);
    if (error.message && error.message.includes('Invalid file type')) return res.status(400).json({ error: 'Invalid file format. Allowed: pdf, docx, txt' });
    res.status(500).json({ error: 'Failed to process file', details: error.message });
  }
});

// GET Route (Added from second file)

app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch {
    res.status(500).json({ message: 'Error fetching feedbacks.' });
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});