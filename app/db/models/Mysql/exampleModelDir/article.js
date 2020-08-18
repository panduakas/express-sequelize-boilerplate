const { Model, Sequelize } = require('sequelize');
const { sequelize } = require('../index');

class Article extends Model {}
Article.init({
  userId: {
    allowNull: false,
    type: Sequelize.STRING,
    references: { model: 'User', key: 'id' },
  },
  text: {
    allowNull: false,
    type: Sequelize.STRING,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Article',
  tableName: 'article',
});

module.exports = {
  Article,
};
