const Reminder = require('../models/reminder.model');
const emailService = require('../utils/emailService');

exports.createReminder = async (req, res) => {
  try {
    const { applicationId, reminderDate, message } = req.body;
    const reminder = await Reminder.create({ applicationId, reminderDate, message, userId: req.userId });
    emailService.sendReminderEmail(req.user.email, reminder);
    res.status(201).send({ message: 'Reminder set successfully', reminder });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.findAll({ where: { userId: req.userId } });
    res.status(200).send(reminders);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
