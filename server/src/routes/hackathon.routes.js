const express = require('express');
const { body } = require('express-validator');

const { protect, restrictTo } = require('../../middleware/auth');
const { validate } = require('../middlewares/validation.middleware');
const {
  getExperts,
  createExpert,
  getGuidanceList,
  getGuidanceById,
  createGuidance,
  submitQuestion,
} = require('../controllers/hackathon.controller');

const router = express.Router();

router.get('/experts', getExperts);
router.get('/guidance', getGuidanceList);
router.get('/guidance/:id', getGuidanceById);

router.post(
  '/experts',
  protect,
  restrictTo('admin'),
  [
    body('name').trim().notEmpty().withMessage('Expert name is required.'),
    body('campus').trim().notEmpty().withMessage('Campus is required.'),
    body('specialization').trim().notEmpty().withMessage('Specialization is required.'),
  ],
  validate,
  createExpert
);

router.post(
  '/guidance',
  protect,
  restrictTo('admin'),
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
    body('content').trim().notEmpty().withMessage('Content is required.'),
    body('expertId').trim().notEmpty().withMessage('expertId is required.'),
  ],
  validate,
  createGuidance
);

router.post(
  '/questions',
  protect,
  [
    body('studentName').trim().notEmpty().withMessage('Student name is required.'),
    body('email').trim().isEmail().withMessage('Valid email is required.'),
    body('topic').trim().notEmpty().withMessage('Topic is required.'),
    body('question').trim().notEmpty().withMessage('Question is required.'),
  ],
  validate,
  submitQuestion
);

module.exports = router;
