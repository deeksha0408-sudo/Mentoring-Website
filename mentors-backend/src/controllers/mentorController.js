const MentorProfile = require('../models/mentorprofile');

const listMentors = async (req, res, next) => {
  try {
    const mentors = await MentorProfile.find().populate('user', 'name email');
    res.json(mentors);
  } catch (err) {
    next(err);
  }
};

module.exports = { listMentors };
