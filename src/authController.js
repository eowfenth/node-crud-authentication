const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const users = [{
    name: "Fernanda",
    email: "nanda@nanda.com",
    username: "nandinha2010",
    password: "$2a$10$AFyY2F0TlCQ7TUsAwquRJu5P9ALE3zM2kpJtgG8IW3ozSwhltkomW",
}];

const auth = async (req, res) => {
    const { email, password } = req.body;

    const hasUser = users.find(user => user.email === email);

    if (hasUser) {
        const checkPass = await bcrypt.compare(password, hasUser.password);

        if (checkPass) {
            const token = jwt.sign({ email }, '12345', {
                expiresIn: '14d',
            });

            return res.json({
                email,
                username: hasUser.username,
                name: hasUser.name,
                token,
            });
        }
    }
};

module.exports = { auth };