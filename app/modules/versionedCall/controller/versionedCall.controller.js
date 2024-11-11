'use strict'

const HttpStatus = require('http-status')

module.exports = {
  oldCall: (req, res) => {
    res.status(HttpStatus.OK).json({ text: 'old call' })
  },
  newCall: (req, res) => {
    res.status(HttpStatus.OK).json({ text: 'new call' })
  }
}
