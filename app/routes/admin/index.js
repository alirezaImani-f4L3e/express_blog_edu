const express = require('express')
const dashboardRoute = require('./dashboard')
const postRoute = require('./posts')
const commentRoute = require('./comments')
const userRoute = require('./users')
const settingRoute = require('./settings')


const router = express.Router()

router.use('/dashboard', dashboardRoute)
router.use('/posts', postRoute)
router.use('/comments', commentRoute)
router.use('/users', userRoute)
router.use('/settings', settingRoute)


module.exports = router