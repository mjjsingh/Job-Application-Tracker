const Application = require('../models/application.model');
const path = require('path');

exports.createApplication = async (req, res) => {
  try {
    const { companyName, jobTitle, applicationDate, status, notes } = req.body;
    const attachment = req.file ? req.file.filename : null;

    const newApplication = await Application.create({
      companyName,
      jobTitle,
      applicationDate,
      status,
      notes,
      attachment
    });

    res.status(201).json({ message: 'Application created successfully', application: newApplication });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ message: 'Failed to create application', error: error.message });
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

