const sequelize = require('../config/connection');
const { User, Media, Artist } = require('../models');

const userData = require('./userData.json');
const mediaData = require('./mediaData.json');
const artistData = require('./artistData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Media.bulkCreate(mediaData, {
    fields: [
      `title`,
      'albums',
      'artURL',
      'spotURL',
      'duration',
      'rating',
      'user_id',
    ],
  });

  await Artist.bulkCreate(artistData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
