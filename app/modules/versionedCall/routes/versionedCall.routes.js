'use strict'

const express = require('express')
const router = express.Router()
const versionRouter = require('express-version-route')
const versionedCallController = require('../controller/versionedCall.controller')

/**
 * @function Config Call routes
 * @description calls to infra configuration and returns it
 * @exports express router
 */

const getVersionedMap = new Map()
getVersionedMap.set('default', versionedCallController.oldCall)
getVersionedMap.set('2.0.0', versionedCallController.newCall)

router.get('/versioned_call', versionRouter.route(getVersionedMap))

module.exports = router
