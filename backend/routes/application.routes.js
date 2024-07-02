const express = require('express');
const { createApplication, getApplications } = require('../controllers/application.controller');
const router = express.Router();
const authJwt = require('../middlewares/auth.jwt');

router.post('/', authJwt, createApplication);
router.get('/', authJwt, getApplications);

module.exports = router;
