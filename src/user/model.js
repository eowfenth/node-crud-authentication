const Pool = require("../db/db");

// getOne
(async (id) => {
    try {
        const { rows } = await Pool.query(
            'SELECT * FROM users WHERE id = $1', [id]
        );
    } catch (err) {

    }
})('')