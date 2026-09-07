const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  field: String,
  startYear: Number,
  endYear: Number,
}, { _id: false });

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startYear: Number,
  endYear: Number,
  description: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase:true },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentee','mentor','admin'], default: 'mentee' },
  bio: { type: String, default: '' },
  headline: { type: String, default: '' },
  location: { type: String, default: '' },
  skills: { type: [String], default: [] },
  education: { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  website: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
