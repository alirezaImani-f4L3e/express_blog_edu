const exphnd = require('express-handlebars')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionStore = require('./session-handlers/mysql')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser());
    app.use(session({
        store: sessionStore(session),
        secret: 'eife83r474bff47fgffg4f77f4gg7',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 12000000 },
        unset: 'destroy'

    }))
    app.use(flash());
    app.engine('handlebars', exphnd());
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, '../views'))
    app.use('/static', express.static(path.join(__dirname, '../public')))
}