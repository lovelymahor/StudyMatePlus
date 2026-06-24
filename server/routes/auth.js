const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const avatarsDir = path.join(__dirname, '..', 'uploads', 'avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, avatarsDir),
  filename: (req, file, cb) => {
    const safeBase = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname || '').toLowerCase() || '.jpg';
    cb(null, `${safeBase}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed.'));
    }
    cb(null, true);
  },
});

const buildAvatarUrl = (avatarPath) => {
  if (!avatarPath) return '';
  if (/^https?:\/\//i.test(avatarPath) || avatarPath.startsWith('data:')) return avatarPath;
  const serverUrl = process.env.SERVER_URL || 'http://localhost:5000';
  return avatarPath.startsWith('/') ? `${serverUrl}${avatarPath}` : `${serverUrl}/${avatarPath}`;
};

// ─── Helper: generate tokens ─────────────────────────────────────────────────
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  });
  return { accessToken, refreshToken };
};

// ─── Helper: send validation errors ─────────────────────────────────────────
const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return false;
  }
  return true;
};

// ─── Rate limiters ────────────────────────────────────────────────────────────
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { success: false, message: 'Too many attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: { success: false, message: 'Too many refresh attempts.' },
});

// ─── REGISTER ────────────────────────────────────────────────────────────────
router.post(
  '/register',
  authLimiter,
  upload.single('avatar'),
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required.')
      .isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters.')
      .escape(),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Please provide a valid email.')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required.')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
      .matches(/[0-9]/).withMessage('Password must contain at least one number.'),
    body('confirmPassword').custom((val, { req }) => {
      if (val !== req.body.password) throw new Error('Passwords do not match.');
      return true;
    }),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

    try {
      const { name, email, password, university, avatar } = req.body;
      const uploadedAvatar = req.file ? `/uploads/avatars/${req.file.filename}` : avatar || '';

      // Check if email already exists
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists.',
        });
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password,
        university: university || '',
        avatar: uploadedAvatar,
      });

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Store refresh token in DB
      await User.findByIdAndUpdate(user._id, {
        $push: { refreshTokens: refreshToken },
      });

      res.status(201).json({
        success: true,
        message: 'Account created successfully!',
        data: {
          user: user.toPublicJSON(),
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ success: false, message: 'Server error during registration.' });
    }
  }
);

// ─── LOGIN ────────────────────────────────────────────────────────────────────
router.post(
  '/login',
  authLimiter,
  [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Please provide a valid email.')
      .normalizeEmail(),
    body('password')
      .notEmpty().withMessage('Password is required.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;

    try {
      const { email, password } = req.body;

      // Find user with password field
      const user = await User.findOne({ email }).select('+password +refreshTokens +loginAttempts +lockUntil');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Check if account is locked
      if (user.isLocked) {
        const lockRemaining = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
        return res.status(423).json({
          success: false,
          message: `Account temporarily locked due to too many failed attempts. Try again in ${lockRemaining} minutes.`,
        });
      }

      // Verify password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        await user.incLoginAttempts();
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Reset attempts on successful login
      await user.resetLoginAttempts();

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user._id);

      // Store refresh token (keep max 5 sessions)
      const updatedTokens = [...(user.refreshTokens || []), refreshToken].slice(-5);
      await User.findByIdAndUpdate(user._id, { refreshTokens: updatedTokens });

      res.status(200).json({
        success: true,
        message: 'Login successful!',
        data: {
          user: user.toPublicJSON(),
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Server error during login.' });
    }
  }
);

// ─── REFRESH TOKEN ────────────────────────────────────────────────────────────
router.post('/refresh', refreshLimiter, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token required.' });
    }

    // Verify refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
    }

    // Find user and check if refresh token is stored
    const user = await User.findById(decoded.id).select('+refreshTokens');
    if (!user || !user.refreshTokens.includes(refreshToken)) {
      return res.status(401).json({ success: false, message: 'Refresh token not recognized.' });
    }

    // Rotate: remove old, add new
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id);
    const updatedTokens = user.refreshTokens
      .filter((t) => t !== refreshToken)
      .concat(newRefreshToken)
      .slice(-5);

    await User.findByIdAndUpdate(user._id, { refreshTokens: updatedTokens });

    res.status(200).json({
      success: true,
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ success: false, message: 'Server error during token refresh.' });
  }
});

// ─── LOGOUT ───────────────────────────────────────────────────────────────────
router.post('/logout', protect, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // Remove this specific refresh token
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { refreshTokens: refreshToken },
    });

    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during logout.' });
  }
});

// ─── LOGOUT ALL DEVICES ──────────────────────────────────────────────────────
router.post('/logout-all', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { refreshTokens: [] });
    res.status(200).json({ success: true, message: 'Logged out from all devices.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ─── GET CURRENT USER ─────────────────────────────────────────────────────────
router.get('/me', protect, (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user.toPublicJSON() } });
});

// ─── UPDATE PROFILE ───────────────────────────────────────────────────────────
router.patch(
  '/profile',
  protect,
  [
    body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters.').escape(),
    body('bio').optional().trim().isLength({ max: 200 }).withMessage('Bio max 200 characters.').escape(),
    body('university').optional().trim().escape(),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;
    try {
      const { name, bio, university, avatar } = req.body;
      const updates = {};
      if (name !== undefined) updates.name = name;
      if (bio !== undefined) updates.bio = bio;
      if (university !== undefined) updates.university = university;
      if (avatar !== undefined) updates.avatar = avatar;

      if (req.file) {
        updates.avatar = `/uploads/avatars/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
      res.status(200).json({ success: true, data: { user: user.toPublicJSON() } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error updating profile.' });
    }
  }
);

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────────────
router.patch(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required.'),
    body('newPassword')
      .isLength({ min: 8 }).withMessage('New password must be at least 8 characters.')
      .matches(/[A-Z]/).withMessage('Must contain an uppercase letter.')
      .matches(/[0-9]/).withMessage('Must contain a number.'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;
    try {
      const user = await User.findById(req.user._id).select('+password');
      const isMatch = await user.comparePassword(req.body.currentPassword);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
      }
      user.password = req.body.newPassword;
      await user.save();
      // Invalidate all refresh tokens (force re-login everywhere)
      await User.findByIdAndUpdate(user._id, { refreshTokens: [] });
      res.status(200).json({ success: true, message: 'Password changed. Please log in again.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  }
);

// ─── LOG STUDY SESSION ────────────────────────────────────────────────────────
router.post('/study-streak', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastStudyDate = user.lastStudyDate ? new Date(user.lastStudyDate) : null;
    if (lastStudyDate) {
      lastStudyDate.setHours(0, 0, 0, 0);
    }

    const diffTime = lastStudyDate ? Math.abs(today - lastStudyDate) : null;
    const diffDays = diffTime !== null ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : null;

    if (diffDays === 0) {
      // Already studied today
      return res.status(200).json({ success: true, message: 'Already marked for today.', data: { user: user.toPublicJSON() } });
    } else if (diffDays === 1) {
      // Studied yesterday
      user.currentStreak += 1;
    } else {
      // Missed a day or first time
      user.currentStreak = 1;
    }

    user.lastStudyDate = new Date();

    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    // Award badges
    const badgeCheckmarks = [
      { days: 3, name: '3-Day Streak' },
      { days: 7, name: '7-Day Streak' },
      { days: 30, name: '30-Day Streak' },
    ];

    badgeCheckmarks.forEach(badge => {
      if (user.longestStreak >= badge.days && !user.badges.includes(badge.name)) {
        user.badges.push(badge.name);
      }
    });

    await user.save();

    res.status(200).json({ success: true, message: 'Study streak updated!', data: { user: user.toPublicJSON() } });
  } catch (error) {
    console.error('Streak update error:', error);
    res.status(500).json({ success: false, message: 'Server error updating study streak.' });
  }
});

module.exports = router;