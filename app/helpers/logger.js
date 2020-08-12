const winston = require('winston');
require('winston-daily-rotate-file');
require('winston-logstash');
const { existsSync, mkdirSync } = require('fs');

const logDir = `${process.env.LOG_DIR}`;

if (!existsSync(logDir)) mkdirSync(logDir);

// Daily rotate generate file log
const transport = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  dirname: logDir,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
});

// stream direct to logstash
// const transport = new winston.transports.Logstash({
//   port: 28777,
//   node_name: process.env.SERVICE_NAME,
//   host: '127.0.0.1',
// });

// instantiate a new Winston Logger with the settings defined above
const winstonLogger = new winston.Logger({
  transports: [transport],
  exitOnError: false, // do not exit on handled exceptions
});

const handleLoggerparams = ({
  data, message, method, mep, statusCode,
}) => ({
  data,
  message,
  method,
  mep, // message exchange pattern
  statusCode,
});

const logInfo = (params) => {
  const data = handleLoggerparams(params);
  data.requestId = process.requestId;
  data.service = process.env.SERVICE_NAME;
  winstonLogger.info(JSON.stringify(data));
};

const logError = (params) => {
  const data = handleLoggerparams(params);
  data.requestId = process.requestId;
  data.service = process.env.SERVICE_NAME;
  winstonLogger.error(JSON.stringify(data));
};

module.exports = {
  logInfo,
  logError,
};
