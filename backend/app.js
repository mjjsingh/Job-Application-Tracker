const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db.config");
const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const applicationRoutes = require("./routes/application.routes");
const reminderRoutes = require("./routes/reminder.routes");
const companyRoutes = require("./routes/company.routes");
const redirectRoutes = require("./routes/redirect.routes");
const verify = require("./middlewares/auth.jwt");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/profile", verify, profileRoutes);
app.use("/api/applications", verify, applicationRoutes);
app.use("/api/reminders", verify, reminderRoutes);
app.use("/api/companies", verify, companyRoutes);
app.use("/api/redirecting", redirectRoutes);

const PORT = process.env.PORT || 3000;

async function initiate() {
  try {
    await sequelize.sync().then(console.log("DB Connected"));
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
      app.use("/api", redirectRoutes);
    });
  } catch (err) {
    console.error("Error initializing server:", err);
  }
}
initiate();
