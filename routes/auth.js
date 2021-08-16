const express = require('express')
const authController = require('@controllers/auth')

const router = express.Router();

router.get('/login', authController.showLogin)
router.post('/login', authController.doLogin)
router.get('/register', authController.showRegister)
router.post('/register', authController.doRegister)

module.exports = router;