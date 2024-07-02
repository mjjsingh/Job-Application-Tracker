const express = require('express');
const { createCompany, getCompanies } = require('../controllers/company.controller');
const router = express.Router();
const authJwt = require('../middlewares/auth.jwt');

router.post('/', authJwt, createCompany);
router.get('/', authJwt, getCompanies);

module.exports = router;
