const { wrap } = require('../helpers');
const { timeOut } = require('../action');

/**
 * @swagger
 *
 * /ping:
 *   get:
 *     description: Sample api
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Success
 */

const ping = async () => {
  /**
   *  throwing error example:
   *
   *  throw new Error('hello');
   *
   *
   *
   *  custom error example:
   *
   *  throw Object.assign(new Error('hello'), { status: 401, data: ['hai', 'kamu'] });
   *
   *
   *
   *  custom statusCode and message example:
   *
   *  const result = {
       status: 202,
       message: 'Pong!',
       data: ['Hello', 'World'],
     };
  */
  const result = ['Hello', 'World'];
  return result;
};

const delayApi = async () => {
  await timeOut(121000);
  throw new Error('TIMEOUT');
};

module.exports = (router) => {
  router.get('/', wrap(ping));
  router.get('/delay', wrap(delayApi));
};
