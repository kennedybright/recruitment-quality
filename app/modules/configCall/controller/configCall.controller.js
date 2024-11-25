'use strict'

const RP = require('request-promise')
const HttpStatus = require('http-status')
const config = require('../../../config')

module.exports.getConfig = async (req, res) => {
  const options = {
    url: `http://${config.appGateway}/infra/configuration/usremoterecqa/?recurse=true`,
    method: 'GET',
    headers: {
      'X-auth-token': config.app.appToken
    },
    json: true
  }
  const serverConfig = await RP(options)
  res.status(HttpStatus.OK).json(serverConfig)
}
