const postButton = document.querySelector("#addPost");
const modalPost = document.querySelector(".modal-post");
const postCard = document.querySelector(".post-card");

// Function to show modal for comments

// Function to show modal for posts
postButton.addEventListener("click", e => {
  e.preventDefault();
  modalPost.classList.toggle("hidden");
  modalPost.classList.toggle("flex");

  if (!modalPost.classList.contains("hidden")) {
    // Ensure only post modal has this listener
    window.addEventListener("click", outsidePostClickListener);
  }
});

// Function to detect outside clicks for posts
function outsidePostClickListener(e) {
  if (!postCard.contains(e.target) && !postButton.contains(e.target)) {
    modalPost.classList.add("hidden");
    modalPost.classList.remove("flex");
    window.removeEventListener("click", outsidePostClickListener); // Remove listener after hiding modalPost
  }
}
