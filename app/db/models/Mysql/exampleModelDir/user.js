const { Model, Sequelize } = require('sequelize');
const { sequelize } = require('../index');

class User extends Model {}
User.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'User',
  tableName: 'user',
});

module.exports = {
  User,
};
