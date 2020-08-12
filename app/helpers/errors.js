const { httpStatus } = require('./codes');

class ErrorNotFound extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorNotFound);

    this.name = 'ErrorNotFound';
    this.status = httpStatus.notFound;
    this.data = null;
  }
}

class ErrorUnauthorized extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorUnauthorized);

    this.name = 'ErrorUnauthorized';
    this.status = httpStatus.unauthorized;
    this.data = null;
  }
}

class ErrorForbidden extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ErrorForbidden);

    this.name = 'ErrorForbidden';
    this.status = httpStatus.forbidden;
    this.data = null;
  }
}
module.exports = {
  ErrorNotFound,
  ErrorUnauthorized,
  ErrorForbidden,
};
