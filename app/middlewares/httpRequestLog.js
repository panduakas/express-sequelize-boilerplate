const logger = require('../libs/logger');

const requestLog = (req, res, next) => {
  const {
    baseUrl,
    originalUrl,
    method,
    query,
    params,
    body,
    requestId,
  } = req;

  const data = {
    query,
    params,
    body,
  };

  if (Object.entries(query).length === 0 && query.constructor === Object) delete data.query;
  if (Object.entries(params).length === 0 && params.constructor === Object) delete data.params;
  if (Object.entries(body).length === 0 && body.constructor === Object) delete data.body;

  logger.info({
    requestId,
    data,
    method,
    description: `REQUEST TO: ${baseUrl || originalUrl}`,
    mep: 'REQUEST',
  });
  res.requestId = requestId;
  res.method = method;

  next();
};

module.exports = {
  requestLog,
};
