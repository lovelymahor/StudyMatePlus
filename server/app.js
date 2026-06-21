const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const connectDB = require('./src/config/db');
const feedbackRoutes = require('./src/routes/feedback.routes');
const hackathonRoutes = require('./src/routes/hackathon.routes');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(helmet());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 250,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// Default Route
app.get('/', (req, res) => {
  res.send('StudyMatePlus API is running ✅');
});

// Routes
app.use('/api', feedbackRoutes);
app.use('/api/hackathon', hackathonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;