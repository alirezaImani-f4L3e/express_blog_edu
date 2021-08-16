const userRoles = require('@models/constants/userConst')

module.exports = (req, res, next) => {
    if (req.session.hasOwnProperty('user')) {

        if (req.session.user.role == userRoles.ADMIN) res.redirect('/admin/dashboard');
        if (req.session.user.role == userRoles.USER) res.redirect('/');

    }
    next();
}