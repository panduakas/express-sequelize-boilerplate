const clone = require('clone');
const { get } = require('lodash');
const { logInfo } = require('../helpers');

const requestLog = async (req, res, next) => {
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

  const requestId = get(req, 'headers.requestid');
  if (requestId) process.requestId = requestId;

  const data = {
    query,
    params,
    body,
    headers,
    ip,
  };

  const cloneData = clone(data);
  if (Object.entries(query).length === 0 && query.constructor === Object) delete data.query;
  if (Object.entries(params).length === 0 && params.constructor === Object) delete data.params;
  if (Object.entries(body).length === 0 && body.constructor === Object) delete data.body;
  if (get(cloneData.headers, 'authorization')) cloneData.headers.authorization = '*';

  await logInfo({
    data: cloneData,
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
