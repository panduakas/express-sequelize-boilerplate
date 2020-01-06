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

// eslint-disable-next-line arrow-body-style
const handleLoggerparams = (params) => {
  return {
    requestId: params.requestId,
    data: params.data || {},
    description: params.description || '',
    method: params.method,
    mep: params.mep,
  };
};

const logger = {
  info: (params) => {
    const data = handleLoggerparams(params);
    winstonLogger.info(JSON.stringify(data));
  },
  error: (params) => {
    const data = handleLoggerparams(params);
    winstonLogger.error(JSON.stringify(data));
  },
};

module.exports = logger;
