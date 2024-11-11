'use strict'

const axios = require('axios')
const HttpStatus = require('http-status')
const config = require('../../../config')

module.exports.getConfig = async (req, res) => {
  const url = `http://${config.appGateway}/infra/configuration/usremoterecqa/?recurse=true`
  const options = {
    headers: {
      'X-auth-token': config.app.appToken
    },
  }
  const serverConfig = await axios.get(url, options)
    res.status(HttpStatus.OK).json(serverConfig.data)
}
