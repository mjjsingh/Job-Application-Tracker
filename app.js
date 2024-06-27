require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sequelize = require('./backend/config/db.config'); 
const authRoutes = require('./backend/routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 4000; 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'frontend')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'signup.html'));
});

// Include API routes
app.use('/api/auth', authRoutes);


sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database synchronized.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database synchronization error:', err);
    });

module.exports = { app, PORT };


