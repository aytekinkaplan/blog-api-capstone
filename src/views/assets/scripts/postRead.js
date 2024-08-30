document.addEventListener("DOMContentLoaded", () => {
  const likeButton = document.getElementById("like-button");
  const likeCount = document.getElementById("like-count");

  likeButton.addEventListener("click", async () => {
    const blogId = likeButton.getAttribute("data-id");

    try {
      const response = await fetch(`/posts/${blogId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        likeCount.textContent = data.likes;
      } else {
        console.error("Failed to like the post.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
