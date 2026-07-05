const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./src/config/db');
const { createRouter, listRouter } = require('./src/routes/feedback');

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('StudyMatePlus API is running ✅');
});

// Routes
app.use('/api/feedback', createRouter);
app.use('/api/feedbacks', listRouter);

module.exports = app;