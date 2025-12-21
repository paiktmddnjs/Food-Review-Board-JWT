// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const api = "http://localhost:8080/api/auth";

export function AuthProvider({ children }) {
 const [user, setUser] = useState(() => {
   const savedUser = localStorage.getItem("user");
   return savedUser ? JSON.parse(savedUser) : null;
 });


// 서버에 id , pw를 보내 사용자 정보를 반환
  const login = async (id, pw) => {
    try {
      const response = await axios.post(`${api}/login`, { id, pw });
      setUser(response.data);
       localStorage.setItem("user", JSON.stringify(response.data));
      return true;
    } catch (err) {
      return false;
    }
  };


// 서버에 가입 정보를 보내 회원가입 성공 여부를 반환
  const register = async (userData) => {
    try {
     const response = await axios.post(`${api}/register`, userData);
      return response; // ⭐ 전체 response 반환
    } catch (err) {
      throw err;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
