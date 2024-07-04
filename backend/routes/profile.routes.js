const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profile.controller');
const router = express.Router();
const authJwt = require('../middlewares/auth.jwt');

router.get('/', authJwt, getProfile);
router.put('/', authJwt, updateProfile);
router.delete('/', authJwt, deleteProfile);

module.exports = router;
