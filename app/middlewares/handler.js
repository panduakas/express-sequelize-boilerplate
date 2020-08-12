const cuid = require('cuid');
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

module.exports = {
  notFound,
  reqId,
  errorHandler,
};
