'use strict'

const HttpStatus = require('http-status')
const logger = require('../../../lib/logger').loggerFactory()

module.exports.echo = (req, res) => {
  res.sendStatus(HttpStatus.OK)
}

module.exports.echoError = (req, res) => {
  try {
    throw new Error('This is a test error for debugging!!')
  } catch (e) {
    logger.error(e)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
  }
}

module.exports.bodyEcho = (req, res) => {
  try {
    const { payload, headers, status } = req.body

    if (headers && headers.length > 0) {
      headers.forEach(h => {
        if (h.key && h.value) {
          res.set(h.key, [h.value])
        }
      })
    }
    res.status(status || HttpStatus.OK).json(payload || {})
  } catch (e) {
    logger.error(e)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message })
  }
}
