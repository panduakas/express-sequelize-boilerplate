require('dotenv').config();
const express = require('express');
const enrouten = require('express-enrouten');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const {
  notFound,
  reqId,
  requestLog,
  limit,
} = require('./middlewares');

const app = express();
const port = process.env.PORT;

app.use(expressValidator());

app.use(cookieParser());
app.use(cors());
app.use(helmet.hidePoweredBy({ setTo: 'PHP/5.4.0' }));
app.use(compress());
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(xss());
app.use(limit);
app.use(reqId);
app.use(requestLog);

// Logger
app.set('etag', false);

// Routing
app.use('/', enrouten({ directory: 'routes' }));

// Not Found handler
app.use('*', notFound);

app.use((err, req, res) => {
  res.status(500).json(err);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}`));


module.exports = app;