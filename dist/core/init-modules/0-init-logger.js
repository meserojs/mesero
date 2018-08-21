"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const winston = require("winston");
const moment = require("moment");
function default_1(config) {
    if (config.env.indexOf('dev') === 0 || config.env === 'debug') {
        return {
            info: (msg) => { console.info(msg); },
            error: (msg) => { console.error(msg); }
        };
    }
    const logFolder = path.resolve(config.rootDir, config.dir.log);
    !fs.existsSync(logFolder) && fs.mkdirSync(logFolder);
    const { createLogger, format, transports } = winston;
    const { combine, timestamp, printf } = format;
    const formatLog = printf(info => {
        const message = typeof info.message === 'object' ? JSON.stringify(info.message) : info.message;
        return `[${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss')}][${info.level}]: ${message}`;
    });
    const infoLogger = createLogger({
        format: combine(format.splat(), timestamp(), formatLog),
        transports: [
            new transports.File({ filename: path.resolve(logFolder, 'info.log'), level: 'info' })
        ]
    });
    const errorLogger = createLogger({
        format: combine(format.splat(), timestamp(), formatLog),
        transports: [
            new transports.File({ filename: path.resolve(logFolder, 'error.log'), level: 'error' })
        ]
    });
    return {
        info: infoLogger.info,
        error: errorLogger.error
    };
}
exports.default = default_1;
