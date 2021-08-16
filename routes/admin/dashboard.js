const express = require('express')

const dashboardController = require('@controllers/admin/dashboard')
const router = express.Router();

router.get('/', dashboardController.index)

module.exports = router;