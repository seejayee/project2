const router = require('express').Router();
const { Media, User } = require('../models');
const withAuth = require('../utils/auth');
// This utilizes the spotify-web-api-node package, and accompanying ID, Secret, and Token assignment
const SpotifyWebApi = require('spotify-web-api-node');
const withToken = require('../utils/spotToken');
const spotifyApi = new SpotifyWebApi(withToken._credentials);

router.get('/', async (req, res) => {
  try {
    // Get all media and JOIN with user data
    const mediaData = await Media.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    router.get('/songs/:title', withAuth, async (req, res) => {
      spotifyApi.searchTracks(req.params.title).then(
        function (data) {
          res.render('searchResults', {
            data,
          });
          return;
        },
        function (err) {
          console.error(err);
        }
      );
    });

    // console.log("\n\n", withToken._credentials, "\n\n");
    router.get('/profile', withAuth, async (req, res) => {
      try {
        // Find the logged in user based on the session ID
        const userData = await User.findOne({
          where: { id: req.session.user_id },
          attributes: { exclude: ['password'] },
          include: [{ model: Media }],
        });

        const user = userData.get({ plain: true });
        console.log('\n\n user data is', user, '\n');

        res.render('profile', {
          ...user,
          logged_in: true,
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });

    // Serialize data so the template can read it
    const media = mediaData.map((media) => media.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      media,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
