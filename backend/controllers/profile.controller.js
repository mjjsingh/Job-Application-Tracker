const User = require('../models/user.model');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.status(200).send({ username: user.username, careerGoals: user.careerGoals });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { careerGoals } = req.body;
    await User.update({ careerGoals }, { where: { id: req.userId } });
    const updatedUser = await User.findByPk(req.userId);
    res.status(200).send({ username: updatedUser.username, careerGoals: updatedUser.careerGoals });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to update profile' });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    await User.destroy({ where: { id: req.userId } });
    res.status(200).send({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to delete profile' });
  }
};


