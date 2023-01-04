const router = require('express').Router();
const { Media } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newMedia = await Media.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMedia);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const mediaData = await Media.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!mediaData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(mediaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
