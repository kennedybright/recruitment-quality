'use strict'

const express = require('express')
const router = express.Router()
const versionRouter = require('express-version-route')
const configCallController = require('../controller/configCall.controller')

/**
 * @function Config Call routes
 * @description calls to infra configuration and returns it
 * @exports express router
 */

const getConfigMap = new Map()
getConfigMap.set('default', configCallController.getConfig)

router.get('/get_config', versionRouter.route(getConfigMap))

module.exports = router
