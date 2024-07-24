
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const JobListing = require('./jobListing.model'); 

const Company = sequelize.define('Company', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contactName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING
  },
  industry: {
    type: DataTypes.STRING
  },
  notes: {
    type: DataTypes.TEXT
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Company;

Company.hasMany(JobListing, { foreignKey: 'companyId', onDelete: 'CASCADE' });
JobListing.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Company;