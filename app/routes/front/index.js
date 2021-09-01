const express = require('express')
const homeRoute = require('./home')
const postRoute = require('./post')



const router = express.Router()

router.use('/', homeRoute)
router.use('/', postRoute)



module.exports = router