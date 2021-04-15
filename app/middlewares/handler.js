/* eslint-disable no-param-reassign */
const cuid = require('cuid');
const get = require('lodash/get');
const { AsyncLocalStorage } = require('async_hooks');
const { errorResponse, httpStatus } = require('../helpers');

const notFound = (req, res) => {
  res.status(httpStatus.notFound).json({
    status: httpStatus.notFound,
    success: false,
    message: 'Resource not found',
    data: null,
  });
};

const reqId = (req, res, next) => {
  req.requestId = cuid();
  process.requestId = req.requestId;
  next();
  return req.requestId;
};

const errorHandler = (err, req, res) => errorResponse(res, err);


const asyncLocalStorage = new AsyncLocalStorage();
const requestIdMiddleware = (req, res, next) => {
  asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set('requestId', cuid());
    next();
  });
};

const syntaxErrorHandler = (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    error.message = 'Unexpected Error';
    error.status = httpStatus.expectationFail;
    res.status(httpStatus.expectationFail).json(errorResponse(res, error));
  } else {
    next();
  }
};

const unauthorizedErrorHandler = (err, req, res, next) => {
  const errName = get(err, 'name');
  if (errName === 'UnauthorizedError' || errName === 'SyntaxError') {
    res.status(401).json({
      status: 401,
      success: false,
      message: 'UNAUTHORIZED',
      data: null,
    });
  } else {
    next();
  }
};

module.exports = {
  notFound,
  reqId,
  errorHandler,
  requestIdMiddleware,
  asyncLocalStorage,
  syntaxErrorHandler,
  unauthorizedErrorHandler,
};
