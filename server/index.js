const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

dotenv.config();

const app = express();

/* =========================
   CORS CONFIGURATION
========================= */
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

/* =========================
   FEEDBACK SCHEMA
========================= */
const feedbackSchema = new mongoose.Schema({
  studentName: String,

  university: {
    type: String,
    required: true,
  },

  examName: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    required: true,
  },

  feedback: {
    type: String,
    required: true,
  },

  tips: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

/* =========================
   TEST ROUTE
========================= */
app.get('/', (req, res) => {
  res.send('StudyMatePlus API is running ✅');
});

/* =========================
   SUBMIT FEEDBACK
========================= */
app.post(
  '/api/feedback',

  [
    body('university')
      .trim()
      .notEmpty()
      .withMessage('University cannot be empty')
      .escape(),

    body('examName')
      .trim()
      .notEmpty()
      .withMessage('Exam name cannot be empty')
      .escape(),

    body('difficulty')
      .trim()
      .notEmpty()
      .withMessage('Difficulty is required')
      .escape(),

    body('feedback')
      .trim()
      .notEmpty()
      .withMessage('Feedback cannot be empty')
      .escape(),

    body('studentName').trim().escape(),

    body('tips').trim().escape(),
  ],

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const feedbackData = req.body;

      console.log('📩 Received feedback:', feedbackData);

      const newFeedback = new Feedback(feedbackData);

      await newFeedback.save();

      console.log('✅ Feedback saved!');

      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully!',
      });

    } catch (error) {
      console.error('❌ Error saving feedback:', error);

      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  }
);

/* =========================
   GET ALL FEEDBACKS
========================= */
app.get('/api/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({
      createdAt: -1,
    });

    res.status(200).json(feedbacks);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error fetching feedbacks',
    });
  }
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});