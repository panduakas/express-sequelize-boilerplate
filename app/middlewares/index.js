const handler = require('./handler');
const requestLog = require('./httpRequestLog');
const limit = require('./limit');
const auth = require('./auth');

module.exports = {
  ...handler,
  ...requestLog,
  ...limit,
  ...auth,
};
