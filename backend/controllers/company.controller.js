const Company = require('../models/company.model');
const JobListing = require('../models/jobListing.model');

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

exports.createJobListing = async (req, res) => {
  try {
    const { jobTitle, description, requirements, applicationDeadline } = req.body;
    const { companyId } = req.params;
    const jobListing = await JobListing.create({
      jobTitle,
      description,
      requirements,
      applicationDeadline,
      companyId
    });
    res.status(201).send({ message: 'Job listing saved successfully', jobListing });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getJobListings = async (req, res) => {
  try {
    const { companyId } = req.params;
    const jobListings = await JobListing.findAll({ where: { companyId } });
    res.status(200).send(jobListings);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updateJobListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { jobTitle, description, requirements, applicationDeadline } = req.body;
    const jobListing = await JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).send({ error: 'Job listing not found' });
    }
    await jobListing.update({ jobTitle, description, requirements, applicationDeadline });
    res.status(200).send({ message: 'Job listing updated successfully', jobListing });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteJobListing = async (req, res) => {
  try {
    const { id } = req.params;
    const jobListing = await JobListing.findByPk(id);
    if (!jobListing) {
      return res.status(404).send({ error: 'Job listing not found' });
    }
    await jobListing.destroy();
    res.status(200).send({ message: 'Job listing deleted successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
