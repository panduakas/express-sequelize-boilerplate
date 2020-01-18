/* global describe it */
module.exports = (server, assert, dataTest, sequelize) => {
  describe('Ping', () => {
    it('Should Return 202 or 200', (done) => {
      server
        .get('/ping')
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, resp) => {
          const result = resp.body;
          if (err) return done(err);
          assert.equal(result.status, 200);
          return done();
        });
    });

    it('Ping Connection DB Should Return True', async () => {
      try {
        await sequelize.authenticate();
        assert.isTrue(true);
      } catch (error) {
        assert.ifError(error);
      }
    });
  });
};
