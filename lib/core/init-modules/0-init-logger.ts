import * as path from 'path'
import * as fs from 'fs'
import * as winston from 'winston'
import * as moment from 'moment'

export default function (config: MeseroConfig): Logger {
  if (config.env.indexOf('dev') === 0 || config.env === 'debug') {
    return {
      info: (msg) => { console.info(msg) },
      error: (msg) => { console.error(msg) }
    }
  }

  const logFolder: string = path.resolve(config.rootDir, config.dir.log)

  !fs.existsSync(logFolder) && fs.mkdirSync(logFolder)

  const { createLogger, format, transports } = winston
  const { combine, timestamp, printf } = format

  const formatLog = printf(info => {
    const message = typeof info.message === 'object' ? JSON.stringify(info.message) : info.message
    return `[${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss')}][${info.level}]: ${message}`
  })

  const infoLogger = createLogger({
    format: combine(
      format.splat(),
      timestamp(),
      formatLog
    ),
    transports: [
      new transports.File({ filename: path.resolve(logFolder, 'info.log'), level: 'info' })
    ]
  })

  const errorLogger = createLogger({
    format: combine(
      format.splat(),
      timestamp(),
      formatLog
    ),
    transports: [
      new transports.File({ filename: path.resolve(logFolder, 'error.log'), level: 'error' })
    ]
  })

  return {
    info: infoLogger.info,
    error: errorLogger.error
  }
}
