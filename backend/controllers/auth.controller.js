const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { name, email, mobile, password, career_goals } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            name,
            email,
            mobile,
            password: hashedPassword,
            career_goals
        });

        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
            expiresIn: 86400 // 24 hours
        });

        res.status(201).send({ ...user.toJSON(), accessToken: token });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({
                message: `User not found with email ${email}.`
            });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

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
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving User with email " + email
        });
    }
};

exports.updateProfile = async (req, res) => {
    const userId = req.userId;
    const { name, mobile, career_goals } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).send({
                message: `User not found.`
            });
        }

        await user.update({
            name,
            mobile,
            career_goals
        });

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating User profile."
        });
    }
};



