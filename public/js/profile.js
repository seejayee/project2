const newFormHandler = async (event) => {
    event.preventDefault();
  
    const lyrics = document.querySelector('#media-lyrics').value.trim();
    const albums = document.querySelector('#media-albums').value.trim();
  
    if (lyrics && albums) {
      const response = await fetch(`/api/media`, {
        method: 'POST',
        body: JSON.stringify({ lyrics, albums, artist }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-media-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.media-list')
    // .addEventListener('click', delButtonHandler);
  