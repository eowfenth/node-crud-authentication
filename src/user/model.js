const Pool = require("../db/db");

// getOne
// InsertOne
// getAll
// deleteOne
// updateOne

const getOne = async (id) => {
    try {
        const { rows } = await Pool.query(
            'SELECT * FROM users WHERE id = $1', [id]
        );

        return rows;
    } catch (err) {
        return {
            error: 503,
            message: 'Internal Error',
        };
    }
};

const getAll = async (page = 1, limit = 20, { is_deleted = false }) => {
    try {
        const { rows } = await Pool.query(
            'SELECT * FROM users WHERE is_deleted = $3 OFFSET $1 LIMIT $2', [(page - 1) * limit, limit, is_deleted]
        );
        return rows;
    } catch (err) {
        return {
            error: 503,
            message: 'Internal Error',
        };
    }
};

const insertOne = async (user) => {
    const { name, username, email, password_hash } = user;
    try {
        const response = await Pool.query(
            ```SELECT id FROM users WHERE email = $1', [email]
            ```
        );

        if (response.rows.length) {
            return {
                error: 409,
                message: 'Conflict',
            };
        }

        const { rows } = await Pool.query(
            'INSERT INTO users (name, username, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *', [name, username, email, password_hash]
        );

        return rows;
    } catch (err) {
        return {
            error: 503,
            message: 'Internal Error',
        };
    }
};

const deleteOne = async (id) => {
    try {
        const { rows } = await Pool.query(
            'UPDATE users SET is_deleted = true WHERE id = $1 RETURNING *', [id]
        );

        return rows;
    } catch (err) {
        return {
            error: 503,
            message: 'Internal Error',
        };
    }
};


module.exports = { getOne, getAll, insertOne, deleteOne };