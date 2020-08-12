const get = require('lodash/get');
const { successResponse, errorResponse } = require('./common');
const { httpStatus } = require('./codes');

module.exports = fn => (req, res) => fn(req, res)
  .then(result => res
    .status(get(result, 'status') || httpStatus.ok)
    .json(successResponse(res, result))
    .end())
  .catch(error => res
    .status(get(error, 'status') || httpStatus.badRequest)
    .json(errorResponse(res, error))
    .end());
