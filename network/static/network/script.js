function edit_post(post_id) {
  console.log(`Editing post with ID: ${post_id}`);
  const postContent = document.querySelector(`#content-${post_id}`);
  const textarea = document.querySelector(`#edit-box-${post_id}`);
  const editBtn = document.querySelector(`#edit-btn-${post_id}`);
  const saveBtn = document.querySelector(`#save-btn-${post_id}`);

  postContent.classList.add('d-none');
  editBtn.classList.add('d-none');
  textarea.classList.remove('d-none');
  saveBtn.classList.remove('d-none');
}

function save_post(post_id) {
  const newContent = document.querySelector(`#edit-box-${post_id}`).value;
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  fetch(`/save_post/${post_id}`, {
    method: 'PUT',
    headers: {
      'X-CSRFToken': csrftoken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: newContent,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        document.querySelector(`#content-${post_id}`).innerText = newContent;
        document
          .querySelector(`#content-${post_id}`)
          .classList.remove('d-none');
        document
          .querySelector(`#edit-btn-${post_id}`)
          .classList.remove('d-none');
        document.querySelector(`#edit-box-${post_id}`).classList.add('d-none');
        document.querySelector(`#save-btn-${post_id}`).classList.add('d-none');
      } else {
        alert(data.error);
      }
    });
}

function toggle_like(post_id) {
  const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  const likeBtn = document.querySelector(`#like-btn-${post_id}`);

  fetch(`/toggle_like/${post_id}`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.liked) {
        likeBtn.innerText = `Unlike (${data.likes_count})`;
        likeBtn.classList.add('btn-danger');
      } else {
        likeBtn.innerText = `Like (${data.likes_count})`;
        likeBtn.classList.remove('btn-danger');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
