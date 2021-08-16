const statistics = require('@models/statistics')
const commentModel = require('@models/comment')

exports.index = async(req, res) => {
    const stats = {
        totalUser: await statistics.totalUsers(),
        totalComments: await statistics.totalComments(),
        totalViews: await statistics.totalViews() || 0,
        totalPosts: await statistics.totalPosts()
    }

    const latestComments = await commentModel.findLatest(5)

    res.adminRender('admin/dashboard/index', { layout: 'admin', ...stats, latestComments })
}