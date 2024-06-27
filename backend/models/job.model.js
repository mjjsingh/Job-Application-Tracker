const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Job = sequelize.define('Job', {
    company: {
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
        type: DataTypes.TEXT
    }
});

module.exports = Job;
