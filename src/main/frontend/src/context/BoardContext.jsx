// src/context/BoardContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const BoardContext = createContext();
export const useBoard = () => useContext(BoardContext);

const api = "http://localhost:8080/api";

export const BoardProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({}); // { postId: true }
  const [ topLikesCount , setTopLikesCount] = useState({});


  // 1️⃣ 게시글 로드 (안전)
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${api}/posts`);
      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.content || [];
      setPosts(data);
    } catch (e) {
      console.error("게시글 로드 실패", e);
      setPosts([]);
    }
  };

  // 2️⃣ 사용자 좋아요 로드 (안전)
  const fetchLikes = async () => {
    if (!userId) {
      setLikes({});
      return;
    }



    //사용자가 좋아요 누른 게시글 정보를 서버에서 가져와 React 상태에 저장한다.
    try {
      const res = await axios.get(`${api}/likes/user/${userId}`);
        console.log("🔥 좋아요 API 응답 res.data =", res.data);
      const likeMap = {};

      // 좋아요 API가 [postId, postId] 형태라고 가정
      if (Array.isArray(res.data)) { //배열이면 true, 아니면 false
        res.data.forEach(dto  => {
          likeMap[String(dto.postId)] = true;
           console.log("🔥 Array.isArray(res.data) = ", Array.isArray(res.data));
        });
      }

      setLikes(likeMap);
    } catch (e) {
      console.warn("좋아요 로드 실패 (무시)", e);
      setLikes({});
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchLikes();
  }, [userId]);



  // 게시글 추가
const addBoard = async (postData) => {
  await axios.post(`${api}/posts`, {
    title: postData.title,
    content: postData.content,
    author: postData.author,
    category: postData.category,
    score: postData.score,
    image: postData.image,
    date : postData.date,
    userId
  });
  fetchPosts();
};

  // 게시글 수정
  const updateBoard = async (id, postData) => {
    await axios.put(`${api}/posts/${id}`, {
                                              title: postData.title,
                                              content: postData.content,
                                              author: postData.author,
                                              category: postData.category,
                                              score: postData.score,
                                              image: postData.image,
                                              date : postData.date,
                                              userId
                                            });
    fetchPosts();
    return true;
  };

  // 게시글 삭제
  const deleteBoard = async (id) => {
    await axios.delete(`${api}/posts/${id}`);
    fetchPosts();
  };

  // 좋아요 토글
  const togglePostLike = async (postId) => {
    if (!userId) return;
    console.log("👤 userId:", userId);
    await axios.post(`${api}/likes/toggle`, {
      userId,
      postId
    });

     console.log("🔥 userId, postId = ", userId, postId);
     await fetchLikes();  // 내가 눌렀는지 여부
     await loadLikes();   // 🔥 전체 좋아요 수 다시 로드
  };

  // 3️⃣ 좋아요 수 계산
  const safePosts = Array.isArray(posts) ? posts : [];
  const postLikeCounts = {};


// postId 기준으로 좋아요 수 가져오기
const loadLikes = async () => {
    try {
      const res = await axios.get(`${api}/likes/postlikes`);

      const ToplikeMap = {};
      res.data.forEach(like => {

          ToplikeMap[like.postId] = like.likeCount;
      });

      setTopLikesCount(ToplikeMap);
    } catch (e) {
      console.error("좋아요 수 로드 실패", e);
    }
  };

  // 컴포넌트가 마운트될 때 한 번 호출
  useEffect(() => {
    loadLikes();
  }, []);


  return (
    <BoardContext.Provider value={{
     posts: safePosts,
       addBoard,
       updateBoard,
       deleteBoard,
       likes,              // 사용자 좋아요 여부
       togglePostLike,
       topLikesCount,      // 🔥 서버 집계 좋아요 수
       loadLikes
    }}>
      {children}
    </BoardContext.Provider>
  );
};
