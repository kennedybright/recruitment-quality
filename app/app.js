'use strict'

const express = require('express')

const expressWinston = require('express-winston')
const path = require('path')

const config = require('./config')
const middleware = require('./middleware')
const logger = require('./lib/logger').expressLogger()

/**
 * Dynamically creates ExpressJS routes based on their definition in each module
 * and creates a base prefix for each module responsibility.
 * @param app ExpressJS application instance
 */
function setRoutes (app) {
  config.assets.routes.forEach((routeFile) => {
    // Load the router file for each routes asset
    const router = require(path.resolve(routeFile))

    // Define the router used by the route asset
    app.use(`/${config.app.baseURL}`, router)
  })
}

// Establish an SQL server connection, instantiating all models and schemas
async function startSequelize () {
  return await require('./lib/db')
}

/**
 * A function for creating the app
 * @returns {Promise}
 */
module.exports = async () => {
  // creating the new app
  const app = express()
  middleware(app)

  await startSequelize()

  setRoutes(app)
  app.use(expressWinston.errorLogger({ winstonInstance: logger }))
  return app  
}
