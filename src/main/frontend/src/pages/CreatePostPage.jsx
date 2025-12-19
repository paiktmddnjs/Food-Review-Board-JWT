// src/pages/CreatePostPage.jsx

import { addPost } from "../api/postApi";

function CreatePostPage() {
  const handleSubmit = async () => {
    const newPost = {
      title: "테스트 제목",
      content: "테스트 내용",
      writer: "user1",
    };

    const saved = await addPost(newPost);
    console.log("서버에 저장됨:", saved);
  };

  return (
    <div>
      <h1>게시글 등록 테스트</h1>
      <button onClick={handleSubmit}>게시글 등록</button>
    </div>
  );
}

export default CreatePostPage;
