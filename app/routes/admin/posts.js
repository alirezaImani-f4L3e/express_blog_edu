const express = require('express')

const router = express.Router()
const postsComtroller = require('@controllers/admin/post');

router.get('/', postsComtroller.index)
router.get('/create', postsComtroller.create)
router.post('/store', postsComtroller.store);
router.get('/delete/:postId', postsComtroller.remove)
router.get('/edit/:postId', postsComtroller.edit)
router.post('/update/:postId', postsComtroller.update)

module.exports = router;