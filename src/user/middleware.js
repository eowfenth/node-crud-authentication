const bcrypt = require("bcryptjs");

const encryptPassword = async (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        res.json({
            error: 400,
            message: "Bad Format",
        });
    }

    const password_hash = await bcrypt.hash(password, 10);

    req.body.password_hash = password_hash;

    return next();
};

module.exports = { encryptPassword }; 