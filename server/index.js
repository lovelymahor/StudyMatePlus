const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const Message = require('./models/Message');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// serve uploaded files statically (protected access may be added later)
app.use('/uploads', express.static(__dirname + '/uploads'));

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

// Mount auth routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

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


// Server Start
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: '*' },
});

// Simple token-auth on socket connection
io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication error'));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  const userId = socket.user.id;
  console.log('Socket connected:', userId);

  // join user's personal room
  socket.join(`user:${userId}`);

  socket.on('join-room', (roomId) => {
    socket.join(`room:${roomId}`);
  });

  socket.on('typing', ({ toUserId, roomId }) => {
    if (roomId) io.to(`room:${roomId}`).emit('typing', { roomId, userId });
    else if (toUserId) io.to(`user:${toUserId}`).emit('typing', { from: userId });
  });

  socket.on('send-message', async (payload) => {
    // payload: { toUserId, roomId, content, attachments }
    try {
      const msg = new Message({
        sender: userId,
        receiver: payload.toUserId || undefined,
        roomId: payload.roomId || undefined,
        content: payload.content || '',
        attachments: payload.attachments || [],
        type: payload.attachments?.length ? 'file' : 'text',
      });
      await msg.save();

      const out = { ...msg.toObject(), createdAt: msg.createdAt };

      if (msg.roomId) io.to(`room:${msg.roomId}`).emit('message', out);
      else if (msg.receiver) {
        io.to(`user:${msg.receiver}`).emit('message', out);
        io.to(`user:${userId}`).emit('message', out);
      }
    } catch (err) {
      console.error('send-message error', err);
      socket.emit('error', { message: 'Message send failed' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', userId);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});