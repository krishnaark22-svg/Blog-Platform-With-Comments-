const API = "http://localhost:5000/api/posts";

// Load posts
async function loadPosts() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("posts").innerHTML = data.map(post => `
    <div>
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <button onclick="deletePost('${post._id}')">Delete</button>
    </div>
  `).join("");
}

// Create post
async function createPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  loadPosts();
}

// Delete post
async function deletePost(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadPosts();
}

loadPosts();
