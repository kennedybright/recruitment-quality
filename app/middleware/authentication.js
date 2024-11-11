'use strict'

const fs = require('fs')
const path = require('path')
const AuthenticationService = require('@nielsen-media/web-commons-authenticationservice')

const envPublicKey = process.env.PUBLIC_KEY

/**
 * Our public key
 * @private
 * @constant {String}
 */
const publicKey = envPublicKey || fs.readFileSync(path.join(__dirname, '/key.pub')).toString().trim()
console.log('publicKey: ', publicKey)

/**
 * @exports Middleware/Verification @function
 * @description A function that set a verification middleware for the requests
 * that come from Infra
 * @requires Authentication module
 * @param {Object} app - express application instance
 */
module.exports = (app) => {
  
  AuthenticationService.setPublicKey(publicKey)
  app.use(async (request, response, next) => {
    console.log(`Verifying ${request.url} in middleware...`)
    if (request.url.includes('/service/')) {
      return next()
    }

    const token = AuthenticationService.parseHeaderToken(request.headers.authorization)
    try {
      request.jwt_payload = await AuthenticationService.verify(token, { algorithms: ['RS256'] })
      next()
    } catch (e) {
      console.error(e)
      response.status(500).json(e.message)
    }
  })
}
