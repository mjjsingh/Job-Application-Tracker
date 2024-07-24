// application.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Application = sequelize.define('Application', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  applicationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachment: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Application;
