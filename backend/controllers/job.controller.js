const Job = require('../models/job.model');

exports.createJobApplication = async (req, res) => {
    const { company, jobTitle, applicationDate, status, notes } = req.body;

    try {
        const job = await Job.create({
            company,
            jobTitle,
            applicationDate,
            status,
            notes,
            UserId: req.userId // Assuming you have UserId associated with the job application
        });

        res.status(201).send(job);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Job Application."
        });
    }
};

exports.updateJobApplication = async (req, res) => {
    const jobId = req.params.id;
    const { company, jobTitle, applicationDate, status, notes } = req.body;

    try {
        const job = await Job.findByPk(jobId);

        if (!job) {
            return res.status(404).send({
                message: `Job Application not found.`
            });
        }

        await job.update({
            company,
            jobTitle,
            applicationDate,
            status,
            notes
        });

        res.status(200).send(job);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating Job Application."
        });
    }
};

exports.getJobApplications = async (req, res) => {
    try {
        const jobs = await Job.findAll({ where: { UserId: req.userId } }); // Assuming UserId is associated with jobs

        res.status(200).send(jobs);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving Job Applications."
        });
    }
};

exports.deleteJobApplication = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await Job.findByPk(jobId);

        if (!job) {
            return res.status(404).send({
                message: `Job Application not found.`
            });
        }

        await job.destroy();

        res.status(204).send();
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error deleting Job Application."
        });
    }
};
