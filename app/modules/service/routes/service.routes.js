'use strict'

const express = require('express')
const router = express.Router()
const serviceController = require('../controller/service.controller')

/**
 * @function Service admin routes
 * @description exposes app health, ping routes and general administrative and monitoring routes
 * @exports express router
 */

router.get('/service/health', serviceController.health)
router.get('/service/version', serviceController.version)

module.exports = router
