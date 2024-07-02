const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  contactDetails: { type: DataTypes.TEXT },
  size: { type: DataTypes.STRING },
  industry: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
});

module.exports = Company;
