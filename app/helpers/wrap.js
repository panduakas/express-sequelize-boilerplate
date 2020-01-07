const get = require('lodash/get');
const { successResponse, errorResponse } = require('./common');
const { httpStatus } = require('../libs');

module.exports = fn => (req, res) => fn(req, res)
  .then(response => res
    .status(get(response, 'status') || httpStatus.ok)
    .json(successResponse(req, response))
    .end())
  .catch(error => res
    .status(get(error, 'status') || httpStatus.badRequest)
    .json(errorResponse(req, error))
    .end());
