const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profile.controller');
const router = express.Router();
const { verify } = require('../middlewares/auth.jwt');

// Define routes and associate them with controller functions
// router.get('/', verify, getProfile);
// router.put('/', verify, updateProfile);
// router.delete('/', verify, deleteProfile);

module.exports = router;

