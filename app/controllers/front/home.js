const postModel = require('@models/post')
const languageService = require('@services/language')
const dateService = require('@services/date')
const statistics = require('@models/statistics');
const settingModel = require('@models/setting')


exports.index = async(req, res) => {
    const per_page = parseInt(await settingModel.get('posts_count_per_page'));
    const page = 'page' in req.query ? parseInt(req.query.page) : 1;
    const totalPosts = await statistics.totalPosts();
    const totalPages = Math.ceil(totalPosts / per_page);
    const posts = await postModel.findAll(page, per_page)
    const pagination = {
        page,
        totalPages,
        nextPage: page < totalPages ? page + 1 : totalPages,
        previousPage: page > 1 ? page - 1 : 1,
        isFirst: page == 1,
        isLast: page == totalPages
    }

    const presentedPost = posts.map(post => {
        post.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(post.posted_at))
        post.persianViews = languageService.toPersianNumber(post.views)
        post.summary = post.content.split(' ').slice(0, 20).join(' ') + ' ...';
        return post;
    })
    res.frontRender('front/home/index', {
        posts: presentedPost,
        pagination
    })
}

exports.search = async(req, res) => {

    const posts = await postModel.findByKeyword(req.query.keyword)
    const presentedPost = posts.map(post => {
        post.created_at_jalali = languageService.toPersianNumber(dateService.toJalali(post.posted_at))
        post.persianViews = languageService.toPersianNumber(post.views)
        post.summary = post.content.split(' ').slice(0, 20).join(' ') + ' ...';
        return post;
    })

    res.frontRender('front/home/search', {
        posts: presentedPost,
        noPost: !Boolean(posts.length)
    })
}