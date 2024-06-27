const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql', // Specify your database dialect (e.g., 'mysql', 'postgres', etc.)
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = sequelize;

