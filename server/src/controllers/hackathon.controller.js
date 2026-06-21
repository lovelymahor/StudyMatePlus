const HackathonExpert = require('../models/hackathonExpert.model');
const HackathonGuidance = require('../models/hackathonGuidance.model');
const HackathonQuestion = require('../models/hackathonQuestion.model');

const getExperts = async (req, res) => {
  try {
    const experts = await HackathonExpert.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: experts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch experts.' });
  }
};

const createExpert = async (req, res) => {
  try {
    const expert = await HackathonExpert.create(req.body);
    return res.status(201).json({ success: true, data: expert });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create expert.', error: error.message });
  }
};

const getGuidanceList = async (req, res) => {
  try {
    const { category } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    const guidance = await HackathonGuidance.find(query)
      .populate('expertId', 'name campus specialization')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: guidance });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch guidance.' });
  }
};

const getGuidanceById = async (req, res) => {
  try {
    const guidance = await HackathonGuidance.findById(req.params.id).populate(
      'expertId',
      'name campus specialization bio linkedin achievements'
    );

    if (!guidance) {
      return res.status(404).json({ success: false, message: 'Guidance not found.' });
    }

    return res.status(200).json({ success: true, data: guidance });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch guidance details.' });
  }
};

const createGuidance = async (req, res) => {
  try {
    const guidance = await HackathonGuidance.create(req.body);
    const populated = await HackathonGuidance.findById(guidance._id).populate(
      'expertId',
      'name campus specialization'
    );
    return res.status(201).json({ success: true, data: populated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create guidance.', error: error.message });
  }
};

const submitQuestion = async (req, res) => {
  try {
    const question = await HackathonQuestion.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Question submitted to campus hackathon experts.',
      data: question,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to submit question.', error: error.message });
  }
};

module.exports = {
  getExperts,
  createExpert,
  getGuidanceList,
  getGuidanceById,
  createGuidance,
  submitQuestion,
};
