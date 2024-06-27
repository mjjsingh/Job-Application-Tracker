const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Application = sequelize.define('Application', {
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    job_title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    application_date: {
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

module.exports = Application;
