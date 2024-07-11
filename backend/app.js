

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const applicationRoutes = require('./routes/application.routes');
const reminderRoutes = require('./routes/reminder.routes');
const companyRoutes = require('./routes/company.routes');
const redirectRoutes = require('./routes/redirect.routes');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/redirecting',redirectRoutes);
const PORT = process.env.PORT || 3000; 



async function initiate() {
  try {
      await sequelize.sync().then(console.log("DB Connected"))
      app.listen(PORT, () => {
          console.log(`Server is running on ${PORT}`);
          app.use("/api", redirectRoutes);
      });
  } catch (err) {
      console.error("Error initializing server:", err);
  }
}
initiate();
