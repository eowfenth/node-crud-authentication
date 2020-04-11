const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization) {
        const [bearer, token] = authorization.split(" ");

        jwt.verify(token, '12345', (err, result) => {
            if (!err) {
                console.log(result);
            }
        })
    }

    return next();
};

module.exports = authMiddleware;