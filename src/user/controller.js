const { getData, write } = require("../db");
const { v4: uuid } = require("uuid");
const User = require("./model");

const create = async (req, res) => {
    const { name, username, email, password_hash } = req.body;

    const user = { 
        name,
        username,
        email
    };

    const response = await User.insertOne({ ...user, password_hash });

    if (!response.length || response.error) {
        if (response.error === 409) {
            return res.json(response);
        }

        return res.json({
            error: 503,
            message: 'Internal Error'
        });
    }

    return res.json({ ...user, id: response[0].id });
};

const remove = async (req, res) => {
    const id = req.params.id;

    const response = await User.deleteOne(id);

    if (response.length) {
        res.json({
            data: response[0],
        });
    }

    return res.json({
        error: 503,
        message: 'Internal Error',
    });
};

const update = async (req, res) => {
    const id = req.params.id;
    const { name, username, email, password, password_hash } = req.body;

    if (!name || !username || !email || !password) {
        return res.json({
            error: 400,
            message: "Bad Format",
        });
    }

    const users = await getData();

    const user_id = users.findIndex(usr => usr.id === id);
    
    if (user_id) {
        users[user_id] = {
            ...users[user_id],
            name,
            username,
            email,
            password: password_hash,
        };
    
        await write([...users]);
    
        return res.json({ name, username, email });
    }

    return res.json({
        error: 404,
        message: 'Not Found',
    });
};

const get = async (req, res) => {
    const id = req.params.id;

    const response = await User.getOne(id);

    if (response.length) {
        const { id, name, username, email } = response[0];
        return res.json({ id, name, username, email });
    }

    return res.status(404).json({
        error: 404,
        message: "Not Found",
    });
};

const getAll = async (req, res) => {
    const { is_deleted = false } = req.query;

    const response = await User.getAll(undefined, undefined, { is_deleted });

    return res.json(response.map(({ password_hash, is_deleted, ...rest}) => rest));
};

module.exports = { create, remove, update, get, getAll };