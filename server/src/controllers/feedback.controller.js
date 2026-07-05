const Feedback = require('../models/feedback.model');

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();

    res.status(201).json({
      message: 'Feedback submitted and saved successfully!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save feedback.',
      error: error.message,
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