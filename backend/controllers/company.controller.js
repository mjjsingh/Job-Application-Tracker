

const Company = require('../models/company.model');

exports.createCompany = async (req, res) => {
  try {
    const { companyName, contactName, email, phone, industry, notes } = req.body;
    const company = await Company.create({
      companyName,
      contactName,
      email,
      phone,
      industry,
      notes,
      userId: req.userId
    });
    res.status(201).send({ message: 'Company information saved successfully', company });
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
