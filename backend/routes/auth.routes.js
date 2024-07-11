const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

// Handle user signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists. Please use a different email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({ token, message: 'User successfully signed up.' });
  
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
});

// Handle user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Please try again.' });
    }

    // Generate JWT token
    const token = generateToken(user);

    
    res.status(200).json({ token, message: 'Login successful.' });
   
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in. Please try again.' });
  }
});

module.exports = router;
