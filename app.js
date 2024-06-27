require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./backend/config/db.config');
const authRoutes = require('./backend/routes/auth.routes');
const profileRoutes = require('./backend/routes/profile.routes');
const applicationRoutes = require('./backend/routes/application.routes'); // Adjust as per your route structure

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes); // Adjust endpoint as needed

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Sync Sequelize models with database and start server
sequelize.sync({ force: false }) // Set force: true if you want to drop tables and recreate them on every server start
    .then(() => {
        console.log('Database synchronized.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database synchronization error:', err);
    });

module.exports = app;



