'use strict'

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
    
    console.log('Sequelize models: ', orm.pgInstance.models)
  }
} catch (e) {
  Logger.error(e.message)
  throw e
}

/**
 * @exports the main application's Sequelize instance and models
 */
module.exports = orm
