const express = require('express');
const { createCompany, getCompanies } = require('../controllers/company.controller');
const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);

module.exports = router;
