const mongoose = require('mongoose');

const mentorProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  skills: [String],
  hourlyRate: Number,
  available: { type: Boolean, default: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MentorProfile', mentorProfileSchema);
