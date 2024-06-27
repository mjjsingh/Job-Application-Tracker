const Application = require('../models/application.model');

exports.createApplication = async (req, res) => {
    const { company_name, job_title, application_date, status, notes } = req.body;

    try {
        const application = await Application.create({
            company_name,
            job_title,
            application_date,
            status,
            notes,
            UserId: req.userId // Assuming you store userId in req.userId after JWT verification
        });

        res.status(201).send(application);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Application."
        });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.findAll({
            where: { UserId: req.userId } // Filter applications by userId
        });
        res.status(200).send(applications);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving applications."
        });
    }
};

exports.getApplicationById = async (req, res) => {
    const id = req.params.id;

    try {
        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).send({
                message: `Application not found with id ${id}.`
            });
        }

        res.status(200).send(application);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error retrieving application with id ${id}.`
        });
    }
};

exports.updateApplication = async (req, res) => {
    const id = req.params.id;
    const { company_name, job_title, application_date, status, notes } = req.body;

    try {
        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).send({
                message: `Application not found with id ${id}.`
            });
        }

        await application.update({
            company_name,
            job_title,
            application_date,
            status,
            notes
        });

        res.status(200).send(application);
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error updating application with id ${id}.`
        });
    }
};

exports.deleteApplication = async (req, res) => {
    const id = req.params.id;

    try {
        const application = await Application.findByPk(id);

        if (!application) {
            return res.status(404).send({
                message: `Application not found with id ${id}.`
            });
        }

        await application.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).send({
            message: err.message || `Error deleting application with id ${id}.`
        });
    }
};
