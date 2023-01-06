const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#media-title').value.trim();

  // GET method to try to get a search function for Spotify music in the homeRoutes.js file
  if (title) {
    const response = await fetch(`/songs/${title}`, {
      method: 'GET',
    });

    if (response.ok) {
      document.location.replace(`/songs/${title}`);
    } else {
      alert('Failed to get media');
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
      alert('Failed to delete media');
    }
  }
};

document
  .querySelector('.new-media-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.media-list')
  .addEventListener('click', delButtonHandler);
