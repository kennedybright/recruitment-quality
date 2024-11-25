'use strict'

const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const Logger = require('./logger').loggerFactory()

const orm = {}

var username = process.env.DB_USERNAME
var pwd = process.env.DB_PASSWORD
var host = process.env.DB_HOST
var appToken = process.env.APP_TOKEN
var appGateway = process.env.APP_GATEWAY_PATH
var client_id = process.env.GOOGLE_CLIENT_ID
var client_secret = process.env.GOOGLE_CLIENT_SECRET
var redirect_uri = process.env.GOOGLE_REDIRECT_URI
var access_token = process.env.GMAIL_ACCESS_TOKEN
var refresh_token = process.env.GMAIL_REFRESH_TOKEN

function createSequelize (DBConfig) {
  return new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    dialect: 'postgres',
    host: DBConfig.host,
    port: DBConfig.port,
    schema: DBConfig.schema,
    ssl: true,
    pool: {
      max: DBConfig.pool.max_connections,
      min: DBConfig.pool.min_connections,
      idle: DBConfig.pool.idle,
      validateConnection: Sequelize.validate
    },
    logging: console.log
  })
}

try {
  if (orm.pgInstance) {
    Logger.info('Sequelize exists; syncing all sequelized models...')
    orm.pgInstance.sync() // sync all models
  } else {
    orm.pgInstance = createSequelize(config.db.pg)

    // Load the models for each file
    config.assets.sequelizeModels.forEach((seqModelFile) => {
      try {
        const seqModelPath = path.resolve(seqModelFile)
        require(seqModelPath)(orm.pgInstance)
      } catch (error) {
        Logger.error(`Failed to load PostgreSQL model at ${seqModelFile}: `, error)
      }
    })

    Object.keys(orm.pgInstance.models).forEach((modelName) => {
      if (orm.pgInstance.models[modelName].associate) {
        orm.pgInstance.models[modelName].associate(orm.pgInstance.models)
      }
    })
    
    console.log("Config variables: ", username, host, pwd, process.rds.appGateway)
    console.log('Sequelize models: ', orm.pgInstance)
  }
} catch (e) {
  Logger.error(e.message)
  throw e
}

/**
 * @exports the main application's Sequelize instance and models
 */
module.exports = orm
