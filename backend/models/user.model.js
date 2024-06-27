const db = require('../config/db.config');

const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.mobile = user.mobile;
    this.password = user.password;
    this.career_goals = user.career_goals; // New field for career goals
};

User.create = (newUser, result) => {
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByEmail = (email, result) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

User.updateProfile = (id, user, result) => {
    db.query(
        "UPDATE users SET name = ?, mobile = ?, career_goals = ? WHERE id = ?",
        [user.name, user.mobile, user.career_goals, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...user });
        }
    );
};

module.exports = User;

