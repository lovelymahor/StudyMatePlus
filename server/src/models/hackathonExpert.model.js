const mongoose = require('mongoose');

const hackathonExpertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    campus: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    bio: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    achievements: { type: [String], default: [] },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HackathonExpert', hackathonExpertSchema);
