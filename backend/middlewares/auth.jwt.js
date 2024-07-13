const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const verify = async (req, res, next) => {
try{
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  })
}catch(err){
  console.log(err)
  return res.status(401).json({success: false, message: "Token verification failed" })
}
};

module.exports = verify;
