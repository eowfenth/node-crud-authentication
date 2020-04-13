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