const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // either receiver (1:1) or roomId (group)
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  roomId: { type: String },
  content: { type: String },
  attachments: [
    {
      url: String,
      filename: String,
      mimeType: String,
      size: Number,
    },
  ],
  type: { type: String, enum: ['text', 'file'], default: 'text' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
