const express = require('express')
const commentController = require('@controllers/admin/comment')

const router = express.Router()

router.get('/', commentController.index)
router.get('/approved/:commentId', commentController.approve);
router.get('/reject/:commentId', commentController.reject);
router.get('/delete/:commentId', commentController.delete);


module.exports = router;