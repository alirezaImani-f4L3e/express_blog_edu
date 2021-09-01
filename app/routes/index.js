const adminRouter = require('./admin')
const authRouter = require('./auth')
const frontRouter = require('./front')
const auth = require('@middlewares/auth')
const admin = require('@middlewares/admin')
const preventAuthAgain = require('@middlewares/preventFromAuth')
const authController = require('@controllers/auth')
const notFoundController = require('@controllers/notFound')


module.exports = app => {
    app.use('/', frontRouter)
    app.use('/admin', [auth, admin], adminRouter);
    app.use('/auth', [preventAuthAgain], authRouter);
    app.get('/logout', authController.logOut);
    app.get('/404', notFoundController);
}