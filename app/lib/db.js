'use strict'

require('pg').defaults.parseInt8 = true
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
const Logger = require('./logger').loggerFactory()

const orm = {}

function createSequelize (DBConfig) {
  return new Sequelize(DBConfig.database, DBConfig.username, DBConfig.password, {
    dialect: 'postgres',
    host: DBConfig.host,
    port: DBConfig.port,
    schema: DBConfig.schema,
    // defaultTransactionNestMode: TransactionNestMode.savepoint,
    ssl: true,
    pool: {
      max: DBConfig.pool.max_connections,
      min: DBConfig.pool.min_connections,
      idle: DBConfig.pool.idle,
      validateConnection: Sequelize.validate
    },
    logging: (msg) => Logger.debug(`Sequelize: ${msg}`)
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
    
    Logger.debug('Sequelize models: ', orm.pgInstance.models)
    Logger.debug('Connection details: ', orm.pgInstance.options)
  }
} catch (e) {
  Logger.error(e.message)
  throw e
}

/**
 * @exports the main application's Sequelize instance and models
 */
module.exports = orm

