const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. Import tools from express-validator
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (Using your original URI variable, removed deprecated options)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connected!"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Schema and Model (Added from second file) ---
const feedbackSchema = new mongoose.Schema({
    studentName: String,
    university: { type: String, required: true },
    examName: { type: String, required: true },
    difficulty: { type: String, required: true },
    feedback: { type: String, required: true },
    tips: String,
    createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);


// --- API Routes ---

// Default Route (From your original file)
app.get('/', (req, res) => {
  res.send('StudyMatePlus API is running ✅');
});

// UPDATED Route with Validation and Sanitization Rules (Added from second file)
app.post(
  '/api/feedback',
  // --- Validation Rules Array ---
  [
    body('university').trim().notEmpty().withMessage('University cannot be empty.').escape(),
    body('examName').trim().notEmpty().withMessage('Exam name cannot be empty.').escape(),
    body('difficulty').notEmpty().withMessage('Please select a difficulty.').escape(),
    body('feedback').trim().notEmpty().withMessage('Feedback cannot be empty.').escape(),
    body('studentName').trim().escape(),
    body('tips').trim().escape()
  ],
  // --- Route Handler ---
  async (req, res) => {
    // 3. Check for validation errors first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are errors, send a 400 Bad Request response with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const feedbackData = req.body;
      console.log('Received feedback:', feedbackData);

      const newFeedback = new Feedback(feedbackData);
      await newFeedback.save();
      
      console.log('Feedback saved to database!');
      res.status(201).json({ message: 'Feedback submitted and saved successfully!' });

    } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ message: 'Failed to save feedback.', error: error.message });
    }
  }
);

// GET Route (Added from second file)
app.get('/api/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks.' });
    }
});


// Server Start (From your original file)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});