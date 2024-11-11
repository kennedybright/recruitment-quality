'use strict'

const express = require('express')
const router = express.Router()
const versionRouter = require('express-version-route')
const configCallController = require('../controller/notificationCall.controller')

/**
 * @function Config Call routes
 * @description calls to infra configuration and returns it
 * @exports express router
 */
const notifyVersionMap = new Map()
notifyVersionMap.set('default', configCallController.notify)

router.post('/notify', versionRouter.route(notifyVersionMap))

module.exports = router
