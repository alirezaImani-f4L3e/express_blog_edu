const roles = require('@models/constants/userConst')

module.exports = (req, res, next) => {

    if (req.session.user.role !== roles.ADMIN) {
        return res.redirect('/');
    }
    next();

}