const postModel = require('@models/post')
const userModel = require('@models/user')
const dateService = require('@services/date')
const languageService = require('@services/language')

exports.index = async(req, res) => {

    const posts = await postModel.findAll();
    const presentedPosts = posts.map(post => {
        post.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(post.posted_at))
        post.persianViews = languageService.toPersianNumber(post.views)
        post.full_name = post.full_name || 'کاربر حذف شده است'
        return post;
    })
    res.adminRender('admin/posts/index', { layout: 'admin', posts: presentedPosts })
}

exports.create = async(req, res) => {
    const users = await userModel.findAll(['id', 'full_name'])

    res.adminRender('admin/posts/create', { layout: 'admin', users })
}

exports.store = async(req, res) => {
    const postData = {
        title: req.body.title,
        author_id: req.body.author,
        slug: req.body.slug,
        status: req.body.status,
        content: req.body.content
    };
    const insertId = await postModel.create(postData);

    if (!insertId) {
        res.redirect('/admin/posts/create')
        return;
    }
    res.redirect('/admin/posts')

}

exports.remove = async(req, res) => {
    const postId = req.params.postId;

    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts')
    }

    const result = postModel.delete(postId)

    if (result) {
        res.redirect('/admin/posts')
    }
}

exports.edit = async(req, res) => {
    const postId = req.params.postId;

    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts')
    }

    const post = await postModel.find(postId)
    const users = await userModel.findAll(['id', 'full_name'])
    res.adminRender('admin/posts/edit', {
        layout: 'admin',
        users,
        post,
        helpers: {
            isPostAuthor: function(userId, options) {
                return post.author_id === userId ? options.fn(this) : options.inverse(this)
            },
            isChecked: function(status, options) {
                return post.status === status ? options.fn(this) : options.inverse(this)
            }
        }
    })

}

exports.update = async(req, res) => {
    const postId = req.params.postId;

    if (parseInt(postId) === 0) {
        res.redirect('/admin/posts')
    }

    const postData = {
        title: req.body.title,
        author_id: 1,
        slug: req.body.slug,
        status: req.body.status,
        content: req.body.content
    };

    const result = await postModel.update(postId, postData)
    if (result) {
        res.redirect('/admin/posts')
    }

}