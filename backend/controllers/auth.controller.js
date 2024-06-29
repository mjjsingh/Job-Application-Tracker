const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
