const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const verifyToken = require('../middlewares/auth.jwt');

router.post('/applications', verifyToken, applicationController.createApplication);
router.get('/applications', verifyToken, applicationController.getAllApplications);
router.get('/applications/:id', verifyToken, applicationController.getApplicationById);
router.put('/applications/:id', verifyToken, applicationController.updateApplication);
router.delete('/applications/:id', verifyToken, applicationController.deleteApplication);

module.exports = router;
