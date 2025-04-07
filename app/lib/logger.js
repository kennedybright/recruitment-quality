'use strict'

const { createLogger, transports, config, format } = require('winston')
const expressWinston = require('express-winston')

/**
 * @description filters successful health checks
 * @returns {boolean|TransformableInfo}
 */
const healthCheckFilter = format((info) => {
  const path = info.message
  const status = info.meta?.res?.statusCode
  if (path.includes('/service/health') && status === 200) return false // Drop log
  return info
})

/**
 * @description creates a customizable Console winston transport
 * @param {object} options allows to override defaults for the transport
 * @returns {winston.Logger}
 */
function createWinstonLogger (options = {}) {
  const transportConsole = new (transports.Console)({
    level: options && 'level' in options ? options.level : 'info',
    colorize: options && 'colorize' in options ? options.colorize : true,
    label: options && 'label' in options ? options.label : 'api',
    timestamp: options && 'timestamp' in options ? options.timestamp : true
  })

  const logger = createLogger({
    transports: [transportConsole],
    levels: config.npm.levels,
    format: format.combine(
      healthCheckFilter(),
      format.json()
    )
  })

  return logger
}

exports.loggerFactory = createWinstonLogger

/**
 * @description provides an instance of expressWinston logger
 * @param {object} options allows to override defaults for the transport
 * @param {array} a string array of routes to ignore logging
 * @returns {expressWinston} logger
 */
exports.expressLogger = function expressLogger (options = {}, expressRoutesBlacklist = []) {
  return expressWinston.logger({
    winstonInstance: createWinstonLogger(options),
    ignoreRoute: (req) => expressRoutesBlacklist.includes(req.url)
  })
}
