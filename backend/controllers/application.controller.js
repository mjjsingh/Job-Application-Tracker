const Application = require('../models/application.model');

exports.createApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    const application = await Application.create({ companyName, jobTitle, applicationDate, status, notes, userId: req.userId });
    res.status(201).send({ message: 'Application logged successfully', application });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll({ where: { userId: req.userId } });
    res.status(200).send(applications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
