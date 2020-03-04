/* global describe it */
const faker = require('faker');
const Encryption = require('../../app/libs/encryption');

module.exports = (_server, assert) => {
  describe('AES encription libs', () => {
    it('encrypt and decrypt, Should Return Success', async () => {
      try {
        const payloadTest = {
          phone: faker.phone.phoneNumber(),
          uuid: faker.random.uuid(),
        };
        const data = Encryption.AESEncrypt(payloadTest);
        assert.isDefined(data);
        const decrypt = Encryption.AESDecrypt(data);
        assert.equal(decrypt.phone, payloadTest.phone);
        assert.equal(decrypt.uuid, payloadTest.uuid);
      } catch (error) {
        assert.ifError(error);
      }
    });
  });
};
