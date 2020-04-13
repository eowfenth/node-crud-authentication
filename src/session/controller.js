const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("./config");
const { getData, write } = require("../db");

const comparePassword = async (string, password) => {
    return bcrypt.compare(string, password);
}

const auth = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({
            error: 400,
            message: "Bad Format",
        });
    }

    const users = await getData();
    const user = users.find(user => user.email === email);

    if (user) {
        const doesPasswordMatch = await comparePassword(password, user.password);

        if (doesPasswordMatch) {
            const token = jwt.sign({ email }, secret, {
                expiresIn,
            });

            return res.json({
                email,
                username: user.username,
                name: user.name,
                token,
            });
        }
    }

    return res.json({
        error: 403,
        message: "Forbidden",
    })
};

module.exports = { auth };