const { User } = require('./user');
const { Article } = require('./article');

// User.hasMany(Article, {
//   foreignKey: 'userId',
//   sourceKey: 'id',
// });

Article.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

module.exports = {
  User,
  Article,
};
