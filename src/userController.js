const bcrypt = require("bcryptjs");

let users = [
    {
        name: 'Junior',
        username: 'juninho2009',
        email: 'juninho@juninho.com',
        password: '202cb962ac59075b964b07152d234b70',
    },
    {
        name: 'Joshua',
        username: 'joshinho_lambda',
        email: 'joshua@joshua.com',
        password: 'lambda123',
    },
    {
        name: 'Nicolas',
        username: 'nini_colas',
        email: 'nicolas@nicolas.com',
        password: '102030',
    },
];

const create = async (req, res) => {
    const { name, username, email, password_hash } = req.body;

    const data = { 
        name,
        username,
        email,
    };
    console.log(password_hash);
    users.push({ ...data, password: password_hash });

    return res.json(data);
};

const remove = (req, res) => {
    const id = req.params.id;

    users = users.filter((user, idx) => idx.toString() !== id);

    return res.send();
};

const update = (req, res) => {
    const id = req.params.id;
    const { name, username, email, password } = req.body;

    users[id] = {
        name,
        username,
        email,
        password,
    };

    return res.json({ name, username, email });
};

const get = (req, res) => {
    const id = req.params.id;

    const { name, username, email } = users.find((user, idx) => idx.toString() === id);

    return res.json({ name, username, email });
};

const getAll = (req, res) => {
    return res.json(users.map(({ password, ...rest}) => rest));
};

module.exports = { create, remove, update, get, getAll };