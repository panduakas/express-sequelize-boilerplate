const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const basicAuthModule = require('basic-auth');

function basicAuth() {
  return (req, res, next) => {
    const user = basicAuthModule(req);
    if (!user || user.name !== process.env.AUTH_NAME || user.pass !== process.env.AUTH_PASS) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
    } else {
      next();
    }
  };
}

module.exports = (router) => {
  const docTitle = process.env.SWAGGER_TITLE;
  const docVersion = process.env.SWAGGER_VERSION;

  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
      info: {
        title: docTitle,
        version: docVersion,
      },
    },
    apis: ['./app/routes/*.js'],
  });

  const showExplorer = false;
  const options = {};
  const customCss = '';
  const customFavicon = '';
  const swaggerUrl = '';

  router.use(
    '/',
    basicAuth(),
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerSpec,
      showExplorer,
      options,
      customCss,
      customFavicon,
      swaggerUrl,
      docTitle,
      (req, res, next) => {
        next();
      },
    ),
  );
};
