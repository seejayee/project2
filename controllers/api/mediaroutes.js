const router = require('express').Router();
const { Media } = require('../../models');
const withAuth = require('../../utils/auth');

// This utilizes the spotify-web-api-node package, and accompanying ID, Secret, and Token assignment
const SpotifyWebApi = require('spotify-web-api-node');
const withToken = require('../../utils/spotToken');
const spotifyApi = new SpotifyWebApi(withToken._credentials);

router.get('/', withAuth, async (req, res) => {
  console.log('\n\nsearching for music\n\n');

      // These console.log functions are various ways to access useful information via the spotify-web-api-node package.
      console.log(
      spotifyApi.searchTracks('Come Together')
  .then(function(data) {
    console.log('Here is the track name of the first search result: ', JSON.stringify(data.body.tracks.items[0].name));
    console.log('Here is the URL for the first search result: ', JSON.stringify(data.body.tracks.items[0].external_urls.spotify));
    console.log('Here is the Spotify ID for the first search result: ', JSON.stringify(data.body.tracks.items[0].id));
    console.log('Here is the first artist listed for the first search result: ', JSON.stringify(data.body.tracks.items[0].artists[0].name));
    console.log('Here is the album name for the first search result: ', JSON.stringify(data.body.tracks.items[0].album.name), "\n\n---------------------\n");
    // console.log(data.body.tracks.items.map(ele => ele.name));

    songResults = data.body.tracks.items.map(ele => ele.name);

    artistResults = data.body.tracks.items.map(ele => ele.artists.map(ele => ele.name));

    console.log(songResults.map((e, i) => [e, artistResults[i]]));

    console.log("\n", 
      data.body.tracks.items.forEach(element => {
        console.log("\n\n", element.name, ",\nby artist(s): ", element.artists
          .forEach(element => {
          console.log(element.name)
        }
        ));
      }), "\n\n"
    );
    // console.log('Here is all the data for the first search result: ', JSON.stringify(data.body.tracks.items[0]));
    console.log("Here I am")

  }, function(err) {
    console.error(err);
  })
    );

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
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(mediaData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
