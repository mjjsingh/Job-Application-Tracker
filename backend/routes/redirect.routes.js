
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/welcome', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'index.html');
  res.sendFile(filePath);
});

router.get('/profilePage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'profile.html');
  res.sendFile(filePath);
});

router.get('/loginPage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'login.html');
  res.sendFile(filePath);
});

router.get('/signupPage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'signup.html');
  res.sendFile(filePath);
});

router.get('/dashboardPage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'dashboard.html');
  res.sendFile(filePath);
});

router.get('/jobApplicationPage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'job_application.html');
  res.sendFile(filePath);
});

router.get('/companyInformationPage', (req, res) => {
  const filePath = path.join(__dirname,  '..', 'public', 'company_information.html');
  res.sendFile(filePath);
});


module.exports = router;
