'use strict'

const HttpStatus = require('http-status')

module.exports.health = (req, res) => {
  res.sendStatus(HttpStatus.OK)
}

module.exports.version = (req, res) => {
  const version = require('../../../package').version
  return res.status(HttpStatus.OK).json({ v: version || 'n/a' })
}
