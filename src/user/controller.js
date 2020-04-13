const { getData, write } = require("../db");
const { v4: uuid } = require("uuid");

const create = async (req, res) => {
    const { name, username, email, password_hash } = req.body;

    const user = { 
        name,
        username,
        email,
        id: uuid(),
    };

    const data = await getData();

    const alreadyExists = data.find(usr => usr.email === email);
    if (alreadyExists) {
        return res.json({
            error: 409,
            message: "Conflict",
        });
    }

    await write([...data, { ...user, password: password_hash }]);

    return res.json(user);
};

const remove = async (req, res) => {
    const id = req.params.id;

    let users = await getData();

    users = users.filter((user) => user.id !== id);

    await write([...users]);

    return res.send();
};

const update = async (req, res) => {
    const id = req.params.id;
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.json({
            error: 400,
            message: "Bad Format",
        });
    }

    const users = await getData();

    const user_id = user.findIndex(usr => usr.id === id);
    users[user_id] = {
        ...users[user_id],
        name,
        username,
        email,
        password,
    };

    await write([...users]);

    return res.json({ name, username, email });
};

const get = async (req, res) => {
    const id = req.params.id;

    const users = await getData();
    const user = users.find(usr => usr.id === id);

    if (user) {
        const { id, name, username, email } = user;
        return res.json({ id, name, username, email });
    }

    res.status(404).json({
        error: 404,
        message: "Not Found",
    });
};

const getAll = async (req, res) => {
    const users = await getData();
    return res.json(users.map(({ password, ...rest}) => rest));
};

module.exports = { create, remove, update, get, getAll };