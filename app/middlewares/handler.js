const cuid = require('cuid');
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

module.exports = {
  notFound,
  reqId,
  errorHandler,
  requestIdMiddleware,
  asyncLocalStorage,
};
