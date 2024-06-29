const { DataTypes } = require('sequelize');
const sequelize = require('../../../practice_bkd/backend/config/db.config');

const Application = sequelize.define('Application', {
  companyName: { type: DataTypes.STRING, allowNull: false },
  jobTitle: { type: DataTypes.STRING, allowNull: false },
  applicationDate: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT },
});

module.exports = Application;
