const postModel = require('@models/post')
const commentModel = require('@models/comment')

exports.store = async(req, res) => {

    const commentData = {
        author_id: 'user' in req.session ? req.session.user.id : null,
        post_id: req.params.postId,
        user_name: req.session.user.full_name,
        user_email: req.session.user.email,
        user_url: req.session.user.url,
        comment: req.body.comment,

    }

    const result = await commentModel.create(commentData);

    if (result) {
        return res.redirect(`/p/${req.params.postId}`)
    }
}