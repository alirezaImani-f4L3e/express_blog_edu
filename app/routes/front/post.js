const express = require('express')
const postController = require('@controllers/front/post')
const commentController = require('@controllers/front/comment')

const router = express.Router()

router.get('/p/:postId', postController.showPost)
router.post('/p/:postId/comments', commentController.store)

module.exports = router