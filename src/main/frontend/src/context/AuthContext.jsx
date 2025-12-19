// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = "http://localhost:8080/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (id, pw) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { id, pw });
      setUser(response.data);
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
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
