const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');
const upload = require('../middleware/upload');
const path = require('path');

// Fetch messages for a conversation (1:1) or room with pagination
router.get('/messages', auth, async (req, res) => {
  try {
    const { withUserId, roomId, page = 1, limit = 20 } = req.query;
    const query = {};
    if (roomId) query.roomId = roomId;
    else if (withUserId) {
      // messages between req.userId and withUserId
      query.$or = [
        { sender: req.userId, receiver: withUserId },
        { sender: withUserId, receiver: req.userId },
      ];
    } else return res.status(400).json({ message: 'Provide withUserId or roomId' });

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));

    res.json({ messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload attachment
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileUrl = `/uploads/${req.file.filename}`; // served statically
    res.status(201).json({
      file: {
        url: fileUrl,
        filename: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Report a message
router.post('/report', auth, async (req, res) => {
  try {
    const { messageId, reason } = req.body;
    // For now, just log - real implementation would save a report
    console.log('Report received', { reporter: req.userId, messageId, reason });
    res.json({ message: 'Report submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
