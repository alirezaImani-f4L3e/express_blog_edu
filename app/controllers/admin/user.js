const userModel = require('@models/user')
const dateService = require('@services/date')
const languageService = require('@services/language')
const hashService = require('@services/hash')

exports.index = async(req, res) => {
    const users = await userModel.findAll(['id', 'full_name', 'email', 'register_date']);
    const presentedUser = users.map((user) => {
        user.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(user.register_date))
        return user;
    })
    res.adminRender('admin/users/index', { layout: 'admin', users: presentedUser, title: 'admin-users' })
}

exports.create = async(req, res) => {
    const users = await userModel.findAll(['id', 'full_name'])
    res.adminRender('admin/users/create', { layout: 'admin', users })
}

exports.store = async(req, res) => {
    const userData = {
        full_name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashService.hash(req.body.password)
    };
    const insertId = await userModel.create(userData);

    if (insertId) {
        res.redirect('/admin/users')
    }


}

exports.remove = async(req, res) => {
    const userId = req.params.userId

    if (parseInt(userId) === 0) {
        res.redirect('/admin/users')
    }

    const result = userModel.delete(userId)

    if (result) {
        res.redirect('/admin/users')
    }
}

exports.edit = async(req, res) => {
    const userId = req.params.userId;

    if (parseInt(userId) === 0) {
        res.redirect('/admin/users')
    }

    const user = await userModel.find(userId)
    const users = await userModel.findAll(['id', 'full_name'])
    res.adminRender('admin/users/edit', {
        layout: 'admin',
        users,
        user,
        helpers: {
            isuserAuthor: function(userId, options) {
                return user.author_id === userId ? options.fn(this) : options.inverse(this)
            },
            isChecked: function(status, options) {
                return user.status === status ? options.fn(this) : options.inverse(this)
            }
        }
    })

}

exports.update = async(req, res) => {
    const userId = req.params.userId;

    if (parseInt(userId) === 0) {
        res.redirect('/admin/users')
    }

    const userData = {
        title: req.body.title,
        author_id: 1,
        slug: req.body.slug,
        status: req.body.status,
        content: req.body.content
    };

    const result = await userModel.update(userId, userData)
    if (result) {
        res.redirect('/admin/users')
    }

}