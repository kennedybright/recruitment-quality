'use strict'

const http = require('http')
const Logger = require('./lib/logger').loggerFactory()
const createApp = require('./app')

/**
 * Handler for HTTP server "listening" event.
 */
const startup = () => {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log(
    `-----------------------------------------------------------------------------------------
US Remote Recruitment QA app is listening on ${bind} | ${new Date()}
-----------------------------------------------------------------------------------------`
  )
}

// ------------------------------------------------------------------------------
// init and start server
// ------------------------------------------------------------------------------
let server

// creating the app
(async function () {
  try {
    const port = process.env.port || 8070
    const app = (await createApp())
    server = http.createServer(app)
      .listen(port)
      .on('listening', startup)
  } catch (e) {
    Logger.error('ERROR: Server failed')
    Logger.error(`ERROR: ${e.stack}`)
  }
})()
