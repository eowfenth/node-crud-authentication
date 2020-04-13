const fs = require("fs");
const { promisify } = require('util');
const { DB_PATH } = require("../config");
const file = `${__dirname}/../${DB_PATH}`;
const getData = async () => {
    try {
        const data = await promisify(fs.readFile)(file);
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
};

const write = async (data) => {
    return promisify(fs.writeFile)(file, JSON.stringify(data, null, 2));
};

module.exports = { getData, write };