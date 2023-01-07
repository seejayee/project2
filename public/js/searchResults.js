const newFavHandler = async (event) => {
  console.log("newFavhandler called");
  event.preventDefault();

  const title = document.querySelector('#media-title').value.trim();

  if (title) {
    const response = await fetch(`/api/media`, {
      method: 'POST',
      body: JSON.stringify({ title }),
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

document
  .querySelector('.new-media-fav')
  .addEventListener('submit', newFavHandler);

document
  .querySelector('.media-list')
  .addEventListener('click', delButtonHandler);
