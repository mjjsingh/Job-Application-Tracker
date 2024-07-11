const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');

// Handle user signup
router.post('/signup', register );

// Handle user login
router.post('/login', login);

module.exports = router;
