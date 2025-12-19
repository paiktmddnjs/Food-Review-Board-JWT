// api/postApi.js
export async function addPost(postData) {
  const res = await fetch("http://localhost:8080/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });
  return res.json();

  
}