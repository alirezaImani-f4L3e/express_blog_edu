const express = require('express')

const router = express.Router()
const settingsComtroller = require('@controllers/admin/setting');

router.get('/', settingsComtroller.index)
router.post('/', settingsComtroller.store)

module.exports = router;