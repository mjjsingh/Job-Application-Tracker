const express = require('express');
const { createReminder, getReminders } = require('../controllers/reminder.controller');
const router = express.Router();
const authJwt = require('../middlewares/auth.jwt');

router.post('/', authJwt, createReminder);
router.get('/', authJwt, getReminders);

module.exports = router;
