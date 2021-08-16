const express = require('express')
const homeController = require('@controllers/front/home')

const router = express.Router()

router.get('/', homeController.index)

module.exports = router