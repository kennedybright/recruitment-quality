'use strict'

const RP = require('request-promise')
const HttpStatus = require('http-status')
const config = require('../../../config')

module.exports.app_call = async (req, res, next) => {
  try {
    const options = {
      url: `http://${config.appGateway}/v2/usremoterecqa/echo?test=echoTest`,
      method: 'GET',
      headers: {
        authorization: req.headers.authorization
      },
      json: true
    }
    console.log(`options: ${JSON.stringify(options)}`)
    const response = await RP(options)
    res.status(HttpStatus.OK).json(response)
  } catch (e) {
    next(e)
  }
}
