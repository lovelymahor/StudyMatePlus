const { body, validationResult } = require('express-validator');

const feedbackValidationRules = [
  body('university')
    .trim()
    .notEmpty()
    .withMessage('University cannot be empty.')
    .escape(),

  body('examName')
    .trim()
    .notEmpty()
    .withMessage('Exam name cannot be empty.')
    .escape(),

  body('difficulty')
    .notEmpty()
    .withMessage('Please select a difficulty.')
    .escape(),

  body('feedback')
    .trim()
    .notEmpty()
    .withMessage('Feedback cannot be empty.')
    .escape(),

  body('studentName')
    .trim()
    .escape(),

  body('tips')
    .trim()
    .escape()
];

// Validation Checker Middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  next();
};

module.exports = {
  feedbackValidationRules,
  validate
};