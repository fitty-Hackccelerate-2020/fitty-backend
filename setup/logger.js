const winston = require('winston');
const moment = require('moment-timezone');

const customTimestamp = winston.format((info) => ({
  ...info,
  timestamp: moment().tz('Asia/Kolkata').format(),
}));

module.exports = winston.createLogger({
  format: winston.format.combine(
    customTimestamp(),
    winston.format.json(),
    winston.format.printf(
      (info) => `\n${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: new winston.transports.Console(),
});
