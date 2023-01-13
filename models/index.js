const User = require('./User');
const Media = require('./media');
const Artist = require('./Artist');

User.hasMany(Media, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Media.belongsTo(User, {
  foreignKey: 'user_id',
});

Media.hasMany(Artist, {
  foreignKey: 'media_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Media, Artist };
