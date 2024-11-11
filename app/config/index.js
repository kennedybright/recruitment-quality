'use strict'

const glob = require('glob')

const baseConfig = require('./baseConfig')
const assets = require('./assets')

const initConfig = () => {
  const config = Object.assign({}, baseConfig)

  // Resolve all assets based on their glob patterns
  config.assets = {}
  config.assets.routes = glob.sync(assets.routes)
  config.assets.configs = glob.sync(assets.configs)
  config.assets.sequelizeModels = glob.sync(assets.sequelizeModels)

  return config
}

const configObject = initConfig()
module.exports = configObject
