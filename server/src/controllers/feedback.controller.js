const Feedback = require('../models/feedback.model');

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;

    console.log('Received feedback:', feedbackData);

    const newFeedback = new Feedback(feedbackData);

    await newFeedback.save();

    console.log('Feedback saved to database!');

    res.status(201).json({
      message: 'Feedback submitted and saved successfully!'
    });

  } catch (error) {
    console.error('Error saving feedback:', error);

    res.status(500).json({
      message: 'Failed to save feedback.',
      error: error.message
    });
  }
};

// Get All Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({})
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching feedbacks.'
    });
  }
};

module.exports = {
  createFeedback,
  getFeedbacks
};