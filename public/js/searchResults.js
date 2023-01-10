const newFavHandler = async (event) => {
  console.log('newFavhandler called');
  event.preventDefault();
  console.log(event);
  // Album artwork URL (media.art_url)
  console.log(event.target.parentElement.children[0].outerHTML.substr(56, 64));
  // Song title (media.title)
  console.log(event.target.parentElement.children[2].childNodes[1].innerText);
  // Song Spotify URL (media.spot_url)
  console.log(event.target.parentElement.children[2].childNodes[1].children[0].outerHTML.substr(9, 53));
  // Album name (media.albums)
  console.log(event.target.parentElement.children[2].childNodes[3].innerText);
  // Duration in milliseconds (media.duration)
  console.log(event.target.parentElement.children[2].childNodes[5].innerText);
  // Rating percent (media.rating)
  console.log(event.target.parentElement.children[2].childNodes[7].innerText);
  // Artists (the final array "children" needs to be looped) (artist.name by media_id from media.id)
  console.log(event.target.parentElement.children[2].childNodes[9].children[0].innerText);

  const title = event.target.parentElement.children[2].childNodes[1].innerText;
  const albums = event.target.parentElement.children[2].childNodes[3].innerText;
  const art_url = event.target.parentElement.children[0].outerHTML.substr(56, 64);
  const spot_url = event.target.parentElement.children[2].childNodes[1].children[0].outerHTML.substr(9, 53);
  const duration = event.target.parentElement.children[2].childNodes[5].innerText;
  const rating = event.target.parentElement.children[2].childNodes[7].innerText;

  if (title && albums && art_url && spot_url && duration && rating) {
    const response = await fetch(`/api/media`, {
      method: 'POST',
      body: JSON.stringify({ title, albums, art_url, spot_url, duration, rating }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to add media to favorites');
    }
  }

  // const title = document.querySelector('.media-title').innerText;

  // // This should save a new media file to a profile
  // if (title) {
  //   const response = await fetch(`/api/media`, {
  //     method: 'POST',
  //     body: JSON.stringify({ title }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });

  //   if (response.ok) {
  //     document.location.replace('/profile');
  //   } else {
  //     alert('Failed to add media to favorites');
  //   }
  // }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to remove media from favorites');
    }
  }
};

// document
//   .querySelector('.new-media-fav')
//   .addEventListener('submit', newFavHandler);

document
  .querySelector('.save-favorite')
  .addEventListener('click', newFavHandler);

// document
//   .querySelector('.media-list')
//   .addEventListener('click', delButtonHandler);
