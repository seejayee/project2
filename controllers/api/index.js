const router = require('express').Router();
const userRoutes = require('./userRoutes');
const mediaRoutes = require('./mediaRoutes');

router.use('/users', userRoutes);
router.use('/media', mediaRoutes);

module.exports = router;
