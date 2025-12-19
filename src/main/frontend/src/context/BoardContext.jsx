// src/context/BoardContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

const API_URL = "http://localhost:8080/api";

export const BoardProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id;

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // { postId: true }

  // 1. 게시글 로드
  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/posts`);
    setPosts(res.data);
  };

  // 2. 사용자 좋아요 로드
  const fetchLikes = async () => {
    if (!userId) return;
    const res = await axios.get(`${API_URL}/likes/user/${userId}`);
    const likeMap = {};
    res.data.forEach(l => (likeMap[l.post.id] = true));
    setLikes(likeMap);
  };

  useEffect(() => {
    fetchPosts();
    fetchLikes();
  }, [userId]);

  // 게시글 추가
  const addBoard = async (postData) => {
    await axios.post(`${API_URL}/posts`, { ...postData, userId });
    fetchPosts();
  };

  // 게시글 수정
  const updateBoard = async (id, postData) => {
    await axios.put(`${API_URL}/posts/${id}`, postData);
    fetchPosts();
  };

  // 게시글 삭제
  const deleteBoard = async (id) => {
    await axios.delete(`${API_URL}/posts/${id}`);
    fetchPosts();
  };

  // 좋아요 토글
  const togglePostLike = async (postId) => {
    await axios.post(`${API_URL}/likes/toggle`, null, { params: { userId, postId } });
    fetchLikes();
  };

  // 좋아요 수 계산
  const postLikeCounts = {};
  posts.forEach(post => {
    postLikeCounts[post.id] = likes[post.id] ? 1 : 0; // 단순히 로그인 사용자만 체크
  });

  return (
    <BoardContext.Provider value={{
      posts,
      addBoard,
      updateBoard,
      deleteBoard,
      likes,
      togglePostLike,
      postLikeCounts,
    }}>
      {children}
    </BoardContext.Provider>
  );
};
