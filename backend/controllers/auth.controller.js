
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const { response } = require('express');

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)

    if(!username || !password || !email){
      return res.status(400).json({message: 'All field are required'})
    }
   
  

  
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user_data = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(user_data);
    return res.status(201).json({ message: 'User successfully signup',token });
    
    //res.redirect('/login.html'); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};



// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    
    if(!password || !email){
      return res.status(400).json({message: 'All field are required'})
    }
   

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Respond with token and success message
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};