const session = require("express-session");
const userService = require('@services/user')
const settingModel = require('@models/setting')

let isLogin = '';
let isNotLogin = '';
module.exports = app => {


    app.use(async(req, res, next) => {

        isLogin = 'user' in req.session;
        isNotLogin = !isLogin;

        const title = await settingModel.get('websiteTitle')
        const description = await settingModel.get('websiteDescreption')
        const errors = req.flash('errors');
        const success = req.flash('success');
        const hasError = errors.length > 0;
        let user = null;

        if ('user' in req.session) {
            user = req.session.user
            user.avatar = userService.gravatar(user.email)
        }

        res.newRender = (template, options) => {
            options = { hasError, errors, success, title, description, ...options }
            res.render(template, options);
        }
        res.frontRender = (template, options) => {
            options = { layout: 'front', isLogin, isNotLogin, title, description, ...options }
            res.render(template, options);
        }
        res.postRender = (template, options) => {
            options = { layout: 'singlePost', isLogin, isNotLogin, title, description, ...options }
            res.render(template, options);
        }

        res.adminRender = (template, options) => {
            options = { layout: 'admin', hasError, errors, success, user, title, description, ...options }
            res.render(template, options);
        }

        next();
    })
}