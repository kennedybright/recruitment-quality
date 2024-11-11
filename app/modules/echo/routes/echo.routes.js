'use strict'

const express = require('express')
const router = express.Router()
const serviceController = require('../controller/echo.controller')

/**
 * @function Service admin routes
 * @description exposes app health, ping routes and general administrative and monitoring routes
 * @exports express router
 */

router.get('/echo', serviceController.echo)
router.post('/echo', serviceController.bodyEcho)
router.get('/echo-error', serviceController.echoError)

module.exports = router
