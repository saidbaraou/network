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
