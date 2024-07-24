const express = require('express');
const { createApplication, getApplications } = require('../controllers/application.controller');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('attachment'), createApplication);
router.get('/', getApplications);

module.exports = router;
