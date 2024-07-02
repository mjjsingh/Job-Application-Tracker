

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./backend/config/db.config');
const authRoutes = require('./backend/routes/auth.routes');
const profileRoutes = require('./backend/routes/profile.routes');
const applicationRoutes = require('./backend/routes/application.routes');
const reminderRoutes = require('./backend/routes/reminder.routes');
const companyRoutes = require('./backend/routes/company.routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/companies', companyRoutes);

sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch(err => {
  console.error('Database sync error:', err);
});

module.exports = app;
