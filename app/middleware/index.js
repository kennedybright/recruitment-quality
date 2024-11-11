'use strict'

const bodyParser = require('body-parser')

const setAuthenticationMiddleware = require('./authentication')
const Logger = require('../lib/logger')
const versionRequest = require('express-version-request')
const setResolveContext = require('./request_context')
const prometheusOptions = require('./prometheusOptions').options

module.exports = (app) => {
  const expressLogger = Logger.expressLogger({}, [])

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  setAuthenticationMiddleware(app)
  setResolveContext(app)

  app.use(expressLogger)

  // Middleware that sets the request object with a version property by parsing header param
  app.use(versionRequest.setVersionByHeader('X-Api-Version'))

  if (prometheusOptions.isEnabled) {
    const prometheus = require('./prometheus').prometheus
    app.use(prometheus(prometheusOptions))
  }
}
