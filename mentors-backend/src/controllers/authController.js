const { hash: _hash, compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email already used' });
    const hash = await _hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};

module.exports = { register, login };
