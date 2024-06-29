const express = require('express');
const { createReminder, getReminders } = require('../controllers/reminder.controller');
const router = express.Router();
const authJwt = require('../../../practice_bkd/backend/middlewares/auth.jwt');

router.post('/', authJwt, createReminder);
router.get('/', authJwt, getReminders);

module.exports = router;
