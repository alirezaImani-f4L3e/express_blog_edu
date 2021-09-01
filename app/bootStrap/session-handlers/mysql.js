module.exports = session => {
    const mySqlStore = require('express-mysql-session')(session)

    const mySqlOptions = {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT,
        password: process.env.MYSQL_PASSWORD,

    }
    const sessionStore = new mySqlStore(mySqlOptions)
    return sessionStore;
}