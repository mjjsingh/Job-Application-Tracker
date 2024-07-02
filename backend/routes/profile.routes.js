const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const router = express.Router();
const authJwt = require('../middlewares/auth.jwt');

router.get('/', authJwt, getProfile);
router.put('/', authJwt, updateProfile);

module.exports = router;
