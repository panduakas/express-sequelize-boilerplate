const winston = require('winston');
const moment = require('moment');
const Queue = require('bull');
const pickBy = require('lodash/pickBy');
const identity = require('lodash/identity');

const { scheduleJob } = require('node-schedule');
require('winston-daily-rotate-file');
require('winston-logstash');
const {
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} = require('fs');

const queue = new Queue('Logger Queue');
const logDir = `${process.env.LOG_DIR}`;

if (!existsSync(logDir)) mkdirSync(logDir);

scheduleJob({ minute: 59 }, () => {
  const listLogFile = readdirSync(logDir);
  const datePastWeeks = moment().subtract(2, 'weeks').format();
  const validateFile = listLogFile.filter((element) => {
    const dateFile = element.replace('.log', '');
    const toDateFile = new Date(dateFile);
    let result;
    if (moment(toDateFile).format() <= datePastWeeks) result = element;
    return result;
  });
  validateFile.forEach((element) => {
    const linkFile = `${logDir}/${element}`;

    // delete file logs
    unlinkSync(linkFile);
  });
});

const timeOut = ms => new Promise(resolve => setTimeout(resolve, ms));

// Daily rotate generate file log
const transport = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  dirname: logDir,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
});

// stream direct to logstash
const transportLogstash = new winston.transports.Logstash({
  port: process.env.LOGSTASH_PORT,
  node_name: process.env.LABEL,
  host: process.env.LOGSTASH_HOST,
});

// instantiate a new Winston Logger with the settings defined above
const winstonLogger = new winston.Logger({
  transports: [transport, transportLogstash],
  exitOnError: false, // do not exit on handled exceptions
});

const handleLoggerparams = ({
  data, message, method, mep, toService, statusCode, requestId,
}) => ({
  data,
  requestId,
  message,
  method,
  mep, // message exchange pattern
  toService,
  statusCode,
});

const logInfo = async (params) => {
  const data = pickBy(params, identity);
  data.requestId = process.requestId;
  await queue.add({ params: data, logMessage: 'info' });
};

const logError = async (params) => {
  const data = pickBy(params, identity);
  data.requestId = process.requestId;
  await queue.add({ params: data, logMessage: 'error' });
};

queue.process(async (job) => {
  const data = handleLoggerparams(job.data.params);
  data.service = process.env.SERVICE_NAME;
  if (job.data.logMessage === 'info') {
    await timeOut(500);
    winstonLogger.info({ logger: data });
  } else if (job.data.logMessage === 'error') {
    await timeOut(500);
    winstonLogger.error({ logger: data });
  }
});

module.exports = {
  logInfo,
  logError,
};
