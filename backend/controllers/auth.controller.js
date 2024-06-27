const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const { name, email, mobile, password, career_goals } = req.body; // Include career_goals here

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
        career_goals // Include career_goals in the User object
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        } else {
            const token = jwt.sign({ id: data.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });
            res.send({ ...data, accessToken: token });
        }
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with email ${email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with email " + email
                });
            }
        } else {
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                career_goals: user.career_goals,
                accessToken: token
            });
        }
    });
};

exports.updateProfile = (req, res) => {
    const userId = req.userId;
    const { name, mobile, career_goals } = req.body;

    User.updateProfile(userId, { name, mobile, career_goals }, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating User profile."
                });
            }
        } else {
            res.send(data);
        }
    });
};


