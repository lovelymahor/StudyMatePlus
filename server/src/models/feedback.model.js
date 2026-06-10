const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  studentName: String,

  university: {
    type: String,
    required: true
  },

  examName: {
    type: String,
    required: true
  },

  difficulty: {
    type: String,
    required: true
  },

  feedback: {
    type: String,
    required: true
  },

  tips: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;