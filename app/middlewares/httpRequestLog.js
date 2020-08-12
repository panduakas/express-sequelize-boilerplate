const { logInfo } = require('../helpers');

const requestLog = (req, res, next) => {
  const {
    baseUrl,
    originalUrl,
    method,
    query,
    params,
    body,
    ip,
    headers,
  } = req;

  const data = {
    query,
    params,
    body,
    headers,
    ip,
  };

  delete data.headers.authorization;

  if (Object.entries(query).length === 0 && query.constructor === Object) delete data.query;
  if (Object.entries(params).length === 0 && params.constructor === Object) delete data.params;
  if (Object.entries(body).length === 0 && body.constructor === Object) delete data.body;

  logInfo({
    data,
    method,
    message: `REQUEST TO: ${baseUrl || originalUrl}`,
    mep: 'REQUEST',
  });

  res.method = method;
  next();
};

module.exports = {
  requestLog,
};
