const { wrap } = require('../helpers');

/**
 * @swagger
 *
 * /ping:
 *   get:
 *     description: Sample api
 *     produces:
 *       - application/json
 *     responses:
 *       202:
 *         description: Accepted
 */

const ping = async () => {
  /**
   * const result = {
       status: 202,
       message: 'Pong!',
       data: ['Hello', 'World'],
     };
  *//* this for custom statusCode and message */
  const result = ['Hello', 'World'];
  return result;
};

module.exports = (router) => {
  router.get('/', wrap(ping));
};
