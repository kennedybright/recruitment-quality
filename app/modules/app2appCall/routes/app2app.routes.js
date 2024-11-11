'use strict'

const express = require('express')
const router = express.Router()
const versionRouter = require('express-version-route')
const app2appController = require('../controller/app2app.controller')

/**
 * @function Config Call routes
 * @description calls to another app and returns the result
 * @exports express router
 */

const getAppCallMap = new Map()
getAppCallMap.set('default', app2appController.app_call)

router.get('/app_call', versionRouter.route(getAppCallMap))

module.exports = router
