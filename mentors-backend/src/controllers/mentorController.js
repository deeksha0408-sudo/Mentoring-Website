const MentorProfile = require('../models/mentorprofile');
const User = require('../models/user');

const listMentors = async (req, res, next) => {
  try {
    const mentors = await MentorProfile.find().populate('user', 'name email headline skills education location');
    res.json(mentors);
  } catch (err) {
    next(err);
  }
};

const getMyMentorProfile = async (req, res, next) => {
  try {
    const profile = await MentorProfile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Mentor profile not set up yet' });
    res.json(profile);
  } catch (err) { next(err); }
};

const createMentorProfile = async (req, res, next) => {
  try {
    const exist = await MentorProfile.findOne({ user: req.user._id });
    if (exist) return res.status(400).json({ message: 'Mentor profile already exists' });

    const { bio, skills, hourlyRate, available } = req.body;
    const profile = await MentorProfile.create({
      user: req.user._id,
      bio: bio || '',
      skills: skills || [],
      hourlyRate: hourlyRate != null ? Number(hourlyRate) : undefined,
      available: available != null ? available : true,
    });
    await profile.populate('user', 'name email headline skills education location');
    res.status(201).json(profile);
  } catch (err) { next(err); }
};

const updateMentorProfile = async (req, res, next) => {
  try {
    const { bio, skills, hourlyRate, available } = req.body;
    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (skills !== undefined) updates.skills = skills;
    if (hourlyRate !== undefined) updates.hourlyRate = Number(hourlyRate);
    if (available !== undefined) updates.available = available;

    const profile = await MentorProfile.findOneAndUpdate({ user: req.user._id }, updates, { new: true, runValidators: true });
    if (!profile) return res.status(404).json({ message: 'Mentor profile not found' });
    await profile.populate('user', 'name email headline skills education location');
    res.json(profile);
  } catch (err) { next(err); }
};

const listMentees = async (req, res, next) => {
  try {
    const mentees = await User.find({ role: 'mentee' }).select('name email headline location skills education bio');
    res.json(mentees);
  } catch (err) {
    next(err);
  }
};

module.exports = { listMentors, listMentees, getMyMentorProfile, createMentorProfile, updateMentorProfile };
