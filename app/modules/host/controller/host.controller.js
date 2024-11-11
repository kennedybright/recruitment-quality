'use strict'
const ip = require('ip')
const md5 = require('md5')
const HOST_RESPONSE_LENGTH = 5
const url = process.env.url || 'default-url'
const logger = require('../../../lib/logger').loggerFactory()
logger.info(`process.env.url: ${process.env.url}`)
const urlHashed = md5(ip.address()).substring(0, HOST_RESPONSE_LENGTH)

module.exports.getHostnameHashed = (req, res) => {
  let meta = {}
  if (req.jwt_payload && req.jwt_payload.request_id) {
    meta = { request_id: req.jwt_payload.request_id }
  }

  logger.info('return hash of url: ' + url, meta)

  res.status(200).json({ host: urlHashed })
}

module.exports.HOST_RESPONSE_LENGTH = HOST_RESPONSE_LENGTH
