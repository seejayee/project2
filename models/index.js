const User = require('./User');
const Media = require('./Media');

User.hasMany(Media, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Media.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Media };