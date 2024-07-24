const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const JobListing = sequelize.define('JobListing', {
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  requirements: {
    type: DataTypes.TEXT
  },
  applicationDeadline: {
    type: DataTypes.DATE
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = JobListing;
