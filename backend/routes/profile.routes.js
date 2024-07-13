const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profile.controller');
const router = express.Router();

// Define routes and associate them with controller functions
router.get('/',  getProfile);
router.put('/', updateProfile);
router.delete('/', deleteProfile);

module.exports = router;

