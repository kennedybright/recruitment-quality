'use strict'

var username = process.env.DB_USERNAME
var pwd = process.env.DB_PASSWORD
var host = process.env.DB_HOST

module.exports = {
  app: {
    baseURL: 'usremoterecqa',
    appToken: '6b128c4d-0e93-40bd-8461-3fdf8cd0f9d2'
  },
  browserGateway: 'tqa.dev.apps.nielsen.com',
  appGateway: 'appgw.api.dev.apps.nielsen.com',
  db: {
    pg: {
      database: 'analytics',
      username: `${username}`,
      password: `${pwd}`,
      host: `${host}`,
      port: '5432',
      schema: 'remote_recruitment',
      dialect: 'postgres',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
      queueLimit: 0,
      pool: {
        max_connections: 20,
        min_connections: 10,
        idle: 30000
      }
    }
  }
}
