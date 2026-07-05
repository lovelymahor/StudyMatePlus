const express = require('express');

const {
  createFeedback,
  getFeedbacks,
} = require('../controllers/feedback.controller');

const {
  feedbackValidationRules,
  validate,
} = require('../middlewares/validation.middleware');

const createRouter = express.Router();
const listRouter = express.Router();

createRouter.post('/', feedbackValidationRules, validate, createFeedback);
listRouter.get('/', getFeedbacks);

module.exports = { createRouter, listRouter };
