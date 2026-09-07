const User = require('../models/user');
const { publicUser } = require('./authController');

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(publicUser(user));
  } catch (err) { next(err); }
};

const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name', 'bio', 'headline', 'location', 'skills',
      'education', 'experience', 'linkedin', 'github', 'website'
    ];
    const updates = {};
    allowedFields.forEach((f) => {
      if (req.body[f] !== undefined) updates[f] = req.body[f];
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Profile updated', user: publicUser(user) });
  } catch (err) { next(err); }
};

module.exports = { getProfile, updateProfile };
