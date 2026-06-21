const mongoose = require('mongoose');

const hackathonGuidanceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['idea-validation', 'team-building', 'prototype', 'pitching', 'deployment', 'judging'],
      required: true,
    },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HackathonExpert',
      required: true,
    },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HackathonGuidance', hackathonGuidanceSchema);
