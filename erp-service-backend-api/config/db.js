require('dotenv').config();

const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_ACCOUNT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }
});

module.exports = { DB };