/* eslint-disable no-param-reassign */

const isNumber = require('lodash/isNumber');
const toNumber = require('lodash/toNumber');
const isNull = require('lodash/isNull');
const get = require('lodash/get');
const { logInfo, logError } = require('./logger');
const { httpStatus } = require('./codes');
const { AESEncrypt } = require('../libs');

const successResponse = (res, data) => {
  const { method, statusCode } = res;
  const payload = {
    status: get(data, 'status') || httpStatus.ok,
    success: true,
    message: get(data, 'message') || 'Successfully to retrieve data',
    data: get(data, 'data') || data,
  };

  logInfo({
    method,
    statusCode,
    ...payload,
    mep: 'RESPONSE',
  });

  let result = payload;
  if (process.env.NODE_ENV === 'production') result = AESEncrypt(payload);

  return result;
};

const errorResponse = (res, e) => {
  const { method, statusCode } = res;
  const payload = {
    status: get(e, 'status') || httpStatus.badRequest,
    success: false,
    message: (get(e, 'error') && get(e.error, 'message'))
    || (get(e, 'message') && get(e.original, 'code'))
    || get(e, 'message'),
    data: get(e, 'data') || null,
  };

  logError({
    method,
    statusCode,
    ...payload,
    mep: 'RESPONSE',
  });

  let result = payload;
  if (process.env.NODE_ENV === 'production') result = AESEncrypt(payload);

  return result;
};

const paging = (page = 1, limit = 10) => {
  if (page === 0 || isNull(page)) page = 1;

  if (isNull(limit)) limit = 10;

  const getPage = isNumber(page) ? page : toNumber(page);
  const getLimit = isNumber(limit) ? limit : toNumber(limit);

  return {
    page: getPage,
    limit: getLimit,
    offset: Math.abs(((getPage - 1) * getLimit)),
  };
};

module.exports = {
  errorResponse,
  successResponse,
  paging,
};
