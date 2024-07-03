

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const applicationRoutes = require('./routes/application.routes');
const reminderRoutes = require('./routes/reminder.routes');
const companyRoutes = require('./routes/company.routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/companies', companyRoutes);

sequelize.sync({ force: true }).then(() => {  // Force sync
  console.log('Database synchronized');
}).catch(err => {
  console.error('Database sync error:', err);
});

module.exports = app;
