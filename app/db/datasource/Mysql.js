require('dotenv').config();
const Sequelize = require('sequelize');

const db = {};
db.development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_URL,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
  timezone: '+07:00',
};

db.production = {
  use_env_variable: process.env.DB_CUSTOM_PROD,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
  timezone: '+07:00',
};

db.test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_URL,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
  timezone: '+07:00',
};

module.exports = db;
