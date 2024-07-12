
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  const token = req.headers['Authorization'];
console.log(token)
  if (!token) {
    return res.status(403).send({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};


