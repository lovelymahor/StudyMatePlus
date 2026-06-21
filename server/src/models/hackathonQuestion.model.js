const mongoose = require('mongoose');

const hackathonQuestionSchema = new mongoose.Schema(
  {
    studentName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    topic: { type: String, required: true, trim: true },
    question: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['pending', 'answered', 'rejected'],
      default: 'pending',
    },
    answer: { type: String, default: '' },
    answeredBy: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HackathonQuestion', hackathonQuestionSchema);
