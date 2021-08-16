const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,

});

module.exports = connection.promise();