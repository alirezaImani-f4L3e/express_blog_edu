const commentModel = require('@models/comment')
const userServices = require('@services/user')
const dateService = require('@services/date')
const languageService = require('@services/language')
const commentsStatus = require('@models/comment/commentsStatus')

exports.index = async(req, res) => {

    const comments = await commentModel.findAll()
    const presentedComments = comments.map(comment => {
        comment.userAvatar = userServices.gravatar(comment.user_email);
        comment.commented_at_jalali = languageService.toPersianNumber(dateService.toJalali(comment.commented_at))
        return comment;
    })

    res.adminRender('admin/comments/index', {
        layout: 'admin',
        comments: presentedComments,
        helpers: {
            bgColorStatus: function(status, options) {
                let cssStyle = 'alert ';

                switch (true) {
                    case status === commentsStatus.APPROVED:
                        cssStyle += 'alert-success';
                        break;
                    case status === commentsStatus.REVIEW:
                        cssStyle += 'alert-dark';
                        break;
                    case status === commentsStatus.REJECTED:
                        cssStyle += 'alert-danger';
                        break;

                }

                return cssStyle;
            }
        }
    })
}

exports.reject = async(req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.reject(commentId)
    return res.redirect('/admin/comments')
}
exports.approve = async(req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.approve(commentId)
    return res.redirect('/admin/comments')
}
exports.delete = async(req, res) => {
    const commentId = req.params.commentId;
    const result = await commentModel.delete(commentId)
    return res.redirect('/admin/comments')
}