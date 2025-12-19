import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routePaths"; // ROUTES 객체를 사용하기 위해 import
import { BoardProvider } from "../context/BoardContext";
import { AuthProvider } from "../context/AuthContext";

import Home from "../pages/Home";
import BoardList from "../pages/BoardList";
import EditBoard from "../pages/EditBoard";
import WriteBoard from "../pages/WriteBoard";
import BoardDetail from "../pages/BoardDetail";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFound from "../pages/NotFound";
import TopPosts from "../pages/TopPosts";

import ProtectedRoute from "../routes/ProtectedRoute";


function AppRoutes() {
  // NOTES:
  // 1. TopPosts는 Home 컴포넌트의 중첩 라우트로 설정되어, ProtectedRoute 보호를 받습니다.
  // 2. 접근 경로는 ROUTES.HOME (/) + "top" = /top 이 됩니다.

  return (
    <AuthProvider>
      <BoardProvider>
        <BrowserRouter>
          <Routes>
            {/* 독립 페이지 */}
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            {/* EditBoard 경로는 ProtectedRoute 외부로 설정되어 있지만,
                실제 수정 로직에서 인증이 필요할 수 있습니다. */}
            <Route path={ROUTES.EDIT(":id")} element={<EditBoard />} /> 
            
            {/* 홈 + 중첩 라우트 */}
            <Route
              path={ROUTES.HOME}
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              {/* Board Routes */}
              <Route path={ROUTES.BOARD} element={<BoardList />} />
              <Route path={ROUTES.BOARD_DETAIL(":id")} element={<BoardDetail />} />
              
              {/* Writing/Editing Routes */}
              <Route path={ROUTES.WRITE} element={<WriteBoard />} />
              <Route path={ROUTES.WRITE_EDIT(":id")} element={<WriteBoard />} />

              {/* ⭐️ TopPosts Route (인기 리뷰 페이지) ⭐️ */}
              <Route path={ROUTES.TOP_POSTS} element={<TopPosts/>} /> 
                
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </BrowserRouter>
      </BoardProvider>
    </AuthProvider>
  );
}

export default AppRoutes;