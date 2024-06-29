const User = require('../models/user.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, careerGoals } = req.body;
    await User.update({ name, careerGoals }, { where: { id: req.userId } });
    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
