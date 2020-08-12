/* global before after */
const supertest = require('supertest');
const { assert } = require('chai');
const cuid = require('cuid');
const app = require('../app/server');
const { sequelize } = require('../app/db/models/Mysql');
const { AESDecrypt } = require('../app/libs');

const server = supertest(app);
const CREATED_BY = 'Unit_test1';

const dataTest = {
  requestId: cuid(),
  createdBy: CREATED_BY,
};

before((done) => {
  // TODO: Seed Data
  done();
});

require('./ping.test')(server, assert, dataTest, sequelize, AESDecrypt);
require('./libs/encryption.test')(server, assert);

after((done) => {
  // TODO: Delete Seed Data

  done();
});
