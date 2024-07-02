const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Reminder = sequelize.define('Reminder', {
  applicationId: { type: DataTypes.INTEGER, allowNull: false },
  reminderDate: { type: DataTypes.DATE, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Reminder;
