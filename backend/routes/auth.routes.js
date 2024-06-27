const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.jwt');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.put('/profile', verifyToken, authController.updateProfile);

module.exports = router;


