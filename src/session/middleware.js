const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const checkAuthorization = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const [bearer, token] = authorization.split(" ");
        console.log(token);
        jwt.verify(token, secret, (err, result) => {
            console.log(result);
            if (err) {
                res.status(401).json({
                    error: 401,
                    message: 'Unauthorized',
                });
            }
        })

        return next();
    }

    res.status(401).json({
        error: 401,
        message: 'Unauthorized',
    });
};

module.exports = { checkAuthorization };