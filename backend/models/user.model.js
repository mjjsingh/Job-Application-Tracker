const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    career_goals: {
        type: DataTypes.TEXT
    }
});

module.exports = User;


