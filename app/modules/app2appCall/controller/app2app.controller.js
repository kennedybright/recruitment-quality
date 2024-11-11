'use strict'

const axios = require('axios')
const HttpStatus = require('http-status')
const config = require('../../../config')

module.exports.app_call = async (req, res, next) => {
  try {
    const url = `http://${config.appGateway}/v2/usremoterecqa/echo?test=echoTest`
    const options = {
      headers: {
        authorization: req.headers.authorization
      }
    }
    console.log(`URL: ${url}, Options: ${JSON.stringify(options)}`)
    const response = await axios.get(url, options)
    res.status(HttpStatus.OK).json(response.data)
  } catch (e) {
    next(e)
  }
}
