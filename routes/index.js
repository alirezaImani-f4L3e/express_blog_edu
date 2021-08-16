const adminRouter = require('./admin')
const authRouter = require('./auth')
const homeRouter = require('./home')
const auth = require('@middlewares/auth')
const admin = require('@middlewares/admin')
const preventAuthAgain = require('@middlewares/preventFromAuth')
const authController = require('@controllers/auth')


module.exports = app => {
    app.use('/', homeRouter)
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [preventAuthAgain], authRouter);
    app.use('/auth', [preventAuthAgain], authRouter);
    app.get('/logout', authController.logOut);
}