const get = require('lodash/get');
const { successResponse, errorResponse } = require('./common');
const { httpStatus } = require('./codes');

module.exports = fn => (req, res) => fn(req, res)
  .then(async result => res
    .status(get(result, 'status') || httpStatus.ok)
    .json(await successResponse(res, result))
    .end())
  .catch(async error => res
    .status(get(error, 'status') || httpStatus.badRequest)
    .json(await errorResponse(res, error))
    .end());
