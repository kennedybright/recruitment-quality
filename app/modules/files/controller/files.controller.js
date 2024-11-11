'use strict'

const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

module.exports = {
  downloadFile: (req, res, next) => {
    try {
      const filePath = path.join(__dirname, '..', 'exampleFiles/ExpenseReport.csv')
      const file = fs.createReadStream(filePath)
      const contentType = mime.lookup(filePath)
      const stat = fs.statSync(filePath)
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename=ExpenseReport.csv',
        'Content-Length': stat.size
      })
      file.pipe(res)
    } catch (e) {
      console.log('error: ', e)
      next(e)
    }
  }
}
