
const isNumber = require('lodash/isNumber');
const toNumber = require('lodash/toNumber');
const isNull = require('lodash/isNull');
const get = require('lodash/get');
const { logger, httpStatus } = require('../libs');
// const { AESEncrypt } = require('../libs');

const successResponse = (req, data) => {
  const { requestId, method } = req;
  const payload = {
    status: get(data, 'status') || httpStatus.ok,
    success: true,
    message: get(data, 'message') || 'Successfully to retrieve data',
    data: get(data, 'data') || data,
  };

  logger.info({
    requestId,
    data: payload.data,
    method,
    description: payload.message,
    mep: 'RESPONSE',
  });

  return payload;
  // return AESEncrypt(payload);
};

const errorResponse = (req, e) => {
  const { requestId, method } = req;
  const payload = {
    status: get(e, 'status') || httpStatus.badRequest,
    success: false,
    message: (e.error && e.error.message) || get(e, 'message'),
    data: get(e, 'data') || null,
  };

  logger.info({
    requestId,
    data: payload.data,
    method,
    description: payload.message,
    mep: 'RESPONSE',
  });

  return payload;
  // return AESEncrypt(payload);
};

const paging = (page = 1, limit = 10) => {
  if (page === 0 || isNull(page)) {
    // eslint-disable-next-line no-param-reassign
    page = 1;
  }

  if (isNull(limit)) {
    // eslint-disable-next-line no-param-reassign
    limit = 10;
  }

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
