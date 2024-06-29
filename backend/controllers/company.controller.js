const Company = require('../models/company.model');

exports.createCompany = async (req, res) => {
  try {
    const { name, contactDetails, size, industry, notes } = req.body;
    const company = await Company.create({ name, contactDetails, size, industry, notes, userId: req.userId });
    res.status(201).send({ message: 'Company info saved successfully', company });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({ where: { userId: req.userId } });
    res.status(200).send(companies);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
