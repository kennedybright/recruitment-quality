'use strict'

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

module.exports = {
  app: {
    baseURL: 'usremoterecqa',
    appToken: `${appToken}`
  },
  appGateway: `${appGateway}`,
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
  },
  google: {
    clientID: `${client_id}`,
    clientSecret: `${client_secret}`,
    redirectUri: `${redirect_uri}`,
    accessToken: `${access_token}`,
    refreshToken: `${refresh_token}`
  },
}
