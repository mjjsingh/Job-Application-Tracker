const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// Function to generate JWT token
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Validate input fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user_data = await User.create({ username, email, password: hashedPassword });
    console.log(user_data)
    // Generate JWT token
    const token = generateToken(user_data);

    return res.status(201).json({ message: 'User successfully signed up', token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};



// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Respond with the token and a success message
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
