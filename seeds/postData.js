const { Post } = require('../models');

const postdata =
[
  
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;