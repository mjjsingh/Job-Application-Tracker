const express = require('express');
const { createCompany, getCompanies, createJobListing, getJobListings, updateJobListing, deleteJobListing } = require('../controllers/company.controller');
const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);

router.post('/:companyId/job-listings', createJobListing);
router.get('/:companyId/job-listings', getJobListings);
router.put('/job-listings/:id', updateJobListing);
router.delete('/job-listings/:id', deleteJobListing);

module.exports = router;
