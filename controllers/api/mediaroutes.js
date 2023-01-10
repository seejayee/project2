const router = require('express').Router();
const { Media } = require('../../models');
const withAuth = require('../../utils/auth');

// Should pull up a webpage of just the media item selected from the search; doesn't work
router.get('/:id', withAuth, async (req, res) => {
  try {
    const selectedMedia = await Media.findByPk({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!selectedMedia) {
      res.status(404).json({ message: 'No media found with this ID' });
      return;
    }

    res.status(200).json(selectedMedia);
  } catch (err) {
    res.status(400).json(err);
  }
});

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
      res.status(404).json({ message: 'No media found with this id!' });
      return;
    }

    res.status(200).json(mediaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
