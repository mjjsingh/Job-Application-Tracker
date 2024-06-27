const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        User.findByPk(decoded.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found."
                    });
                }
                req.user = user; // Attach user object to request
                next();
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving User."
                });
            });
    });
};

module.exports = verifyToken;

