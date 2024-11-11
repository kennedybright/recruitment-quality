const { Pool } = require('pg')
const DB_CONFIG = require('../config/baseConfig').db
console.log('DB_CONFIG: ', DB_CONFIG.pg)

const maxTryToConnect = 20
const testConnection = async (normalizedRemoteInfraConf) => {
  let tryNumber = 0
  console.log('Checking connection to PostgreSQL db before start migration process')
  while (tryNumber < maxTryToConnect) {
    try {
      const connection = Pool({
        host: normalizedRemoteInfraConf.host,
        user: normalizedRemoteInfraConf.username,
        password: normalizedRemoteInfraConf.password,
        port: normalizedRemoteInfraConf.port
      })

      await connection.connect()
      console.log('PostgreSQL DB Connection succeeded.')
      console.log('connected as id ' + connection.threadId)

      return
    } catch(err) {
      console.error(`Attempt# ${tryNumber} to connect the DB has failed.`)
      tryNumber++

      if (tryNumber < maxTryToConnect) {
        const waitTimeUntilNextTry = 1000 * tryNumber
        console.log(`waiting ${tryNumber} second(s) until next try...`)
        await new Promise(resolve => setTimeout(resolve, waitTimeUntilNextTry))
      } else {
        throw new Error('Unable to connect to the database after multiple attempts: ', err)
      }
    }
  }
}

module.exports = (async () => {
  await testConnection(DB_CONFIG.pg)
  return {
    development: {
      ...DB_CONFIG.pg
    },
    production: {
      ...DB_CONFIG.pg
    }
  }
})()
