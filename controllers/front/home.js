const postModel = require('@models/post')
const languageService = require('@services/language')
const dateService = require('@services/date')


exports.index = async(req, res) => {
    const posts = await postModel.findAll()
    const presentedPost = posts.map(post => {
        post.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(post.posted_at))
        post.persianViews = languageService.toPersianNumber(post.views)
        post.summary = post.content.split(' ').slice(0, 20).join(' ') + ' ...';
        post.full_name = post.full_name || 'کاربر حذف شده است'
        return post;
    })
    res.frontRender('front/home/index', { posts: presentedPost })
}