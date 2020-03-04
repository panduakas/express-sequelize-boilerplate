const winston = require('winston');
require('winston-daily-rotate-file');
const { existsSync, mkdirSync } = require('fs');

const logDir = `${process.env.LOG_DIR}`;

if (!existsSync(logDir)) mkdirSync(logDir);

const transport = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  dirname: logDir,
  datePattern: 'YYYY-MM-DD-HH',
  maxSize: '20m',
});

const winstonLogger = new winston.Logger({
  transports: [transport],
});

const handleLoggerparams = ({
  requestId, data, description, method, mep,
}) => ({
  requestId,
  data,
  description,
  method,
  mep, // message exchange pattern
});

const logInfo = (params) => {
  const data = handleLoggerparams(params);
  winstonLogger.info(JSON.stringify(data));
};

const logError = (params) => {
  const data = handleLoggerparams(params);
  winstonLogger.error(JSON.stringify(data));
};

module.exports = {
  logInfo,
  logError,
};
