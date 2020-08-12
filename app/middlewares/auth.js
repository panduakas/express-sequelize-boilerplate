const basicAuthModule = require('basic-auth');

const basicAuth = () => (req, res, next) => {
  const user = basicAuthModule(req);
  if (!user || user.name !== process.env.AUTH_NAME || user.pass !== process.env.AUTH_PASS) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
  } else {
    next();
  }
};

module.exports = {
  basicAuth,
};
