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

module.exports = { getOne };