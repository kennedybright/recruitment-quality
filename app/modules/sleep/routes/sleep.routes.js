'use strict'

const express = require('express')
const router = express.Router()
const serviceController = require('../controller/sleep.controller')

/**
 * @function Service admin routes
 * @description exposes app health, ping routes and general administrative and monitoring routes
 * @exports express router
 */

router.get('/sleep', serviceController.sleep)

module.exports = router
