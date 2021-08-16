const authService = require('@services/auth')
const userRoles = require('@models/constants/userConst')

exports.showLogin = (req, res) => {
    res.newRender('auth/login', { layout: 'auth' })
}
exports.showRegister = (req, res) => {
    res.newRender('auth/register', { layout: 'auth' })

}
exports.doLogin = async(req, res) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password)
    if (!user) {
        req.flash('errors', ['ایمیل یا کلمه عبور معتبر نیست.'])
        return res.redirect('/auth/login');
    }
    req.session.user = user;
    return user.role === userRoles.ADMIN ? res.redirect('/admin/dashboard') : res.redirect('/');
}
exports.doRegister = async(req, res) => {
    const { email, password, password_confirm } = req.body;
    const newUserId = await authService.register(email, password)
    if (!newUserId) {
        req.flash('errors', 'در فرایند ثبت نام خطایی اتفاق افتاد.')
        return res.redirect('/auth/register')
    }
    return res.redirect('/auth/login')
}

exports.logOut = async(req, res) => {
    req.session.destroy(error => {
        res.redirect('/auth/login')
    })
}