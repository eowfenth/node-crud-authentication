const bcrypt = require("bcryptjs");

const passwordMiddleware = async (req, res, next) => {
    const { password } = req.body;

    const password_hash = await bcrypt.hash(password, 10);

    req.body.password_hash = password_hash;

    return next();
};

module.exports = passwordMiddleware;