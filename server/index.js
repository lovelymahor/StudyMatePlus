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