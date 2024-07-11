
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async (req, res, next) => {
  const token = req.headers['Authorization'];
  if (!token) {
    return res.status(403).send({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    console.log(req.userId)
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};
