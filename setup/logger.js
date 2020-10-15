const winston = require('winston');

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(
      (info) => `\n${info.timestamp} [${info.level}]: ${info.message}`
    )
  ),
  transports: new winston.transports.Console(),
});
