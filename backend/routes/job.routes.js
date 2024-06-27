const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const verifyToken = require('../middlewares/auth.jwt');

router.post('/applications', verifyToken, jobController.createJobApplication);
router.put('/applications/:id', verifyToken, jobController.updateJobApplication);
router.get('/applications', verifyToken, jobController.getJobApplications);
router.delete('/applications/:id', verifyToken, jobController.deleteJobApplication);

module.exports = router;
