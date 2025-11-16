const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    next();
  } catch(err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = auth;
