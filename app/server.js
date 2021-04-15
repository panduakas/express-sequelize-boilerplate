require('dotenv').config();
const get = require('lodash/get');
const express = require('express');
const enrouten = require('express-enrouten');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
// const RedisStore = require('connect-redis')(session);
// const redisClient = require('redis').createClient(process.env.REDIS_URL);

const {
  notFound,
  reqId,
  requestLog,
  limit,
  requestIdMiddleware,
  syntaxErrorHandler,
  unauthorizedErrorHandler,
} = require('./middlewares');
const {
  httpStatus,
  errorResponse,
} = require('./helpers');

const app = express();
const port = process.env.PORT;

// const redisOptions = {
//   client: redisClient,
//   no_ready_check: true,
//   ttl: 600,
//   logErrors: true,
// };

// const redisSessionStore = new RedisStore(redisOptions);

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
  // store: redisSessionStore,
  resave: false,
  secret: 'ampunb4ngjag0',
  saveUninitialized: false,
}));

app.use(expressValidator());

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP/7.47.0' }));
app.use(compress());
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(syntaxErrorHandler);
app.use(xss());
app.use(limit);
app.use(reqId);
app.use(requestLog);
app.use(requestIdMiddleware);

// Routing
app.use('/', enrouten({ directory: 'routes' }));
app.use(unauthorizedErrorHandler);

// Not Found handler
app.use('*', notFound);

app.use((err, req, res) => res.status(get(err, 'status') || get(res, 'statusCode') || httpStatus.badRequest).json(errorResponse(res, err)));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}`)).setTimeout(130000);


module.exports = app;
