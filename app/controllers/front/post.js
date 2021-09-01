const postModel = require('@models/post')
const userModel = require('@models/user')
const userService = require('@services/user')
const commentModel = require('@models/comment')
const dateService = require('@services/date')
const languageService = require('@services/language')
const _ = require('lodash')



exports.showPost = async(req, res) => {
    const post = await postModel.findById(req.params.postId);
    if (!post) {
        return res.redirect('/404');
    }
    post.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(post.posted_at))
    const comments = await commentModel.findByPostId(post.id);

    const presentedComments = comments.map(comment => {
        comment.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(comment.commented_at)),
            comment.avatar = userService.gravatar(comment.user_email)
        return comment;

    })

    const newComments = _.groupBy(presentedComments, 'parent')

    const author = await userModel.findById(post.author_id)

    author.avatar = userService.gravatar(author.email);
    post.author = author;

    return res.postRender('front/post/single', {
        post,
        title: post.slug,
        comments: newComments[0],
        noComment: comments.length ? false : true,
        helpers: {
            hasChidlren: function(commentId, options) {
                return commentId in newComments
            },
            getChildren: function(commentId, options) {
                return newComments[commentId];
            }
        }
    })
}