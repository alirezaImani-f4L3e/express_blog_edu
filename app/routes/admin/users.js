const express = require('express')

const router = express.Router()
const usersComtroller = require('@controllers/admin/user');

router.get('/', usersComtroller.index)
router.get('/create', usersComtroller.create)
router.post('/store', usersComtroller.store)
router.get('/delete/:userId', usersComtroller.remove)
router.get('/edit/:userId', usersComtroller.edit)
router.post('/update/:userId', usersComtroller.update)

module.exports = router;