const express = require('express');

const router = express.Router();

const {
  createFeedback,
  getFeedbacks
} = require('../controllers/feedback.controller');

const {
  feedbackValidationRules,
  validate
} = require('../middlewares/validation.middleware');

// POST Feedback
router.post(
  '/feedback',
  feedbackValidationRules,
  validate,
  createFeedback
);

// GET Feedbacks
router.get('/feedbacks', getFeedbacks);

module.exports = router;