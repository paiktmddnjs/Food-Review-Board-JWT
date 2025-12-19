// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBoard } from "../context/BoardContext";
import {
  Container,
  Title,
  Desc,
  ButtonGroup,
  Button,
  LogoutButton,
  StatsContainer,
  StatsItem
} from "./Home.styled";


// 스타일링 컴포넌트 (가정)
function StatsBox({ totalReviews, averageRating, activeUsers }) {
    return (
        <StatsContainer>
            <StatsItem>
                <h4>총 리뷰 수</h4>
                <p>{totalReviews} 개</p>
            </StatsItem>
            <StatsItem>
                <h4>평점 평균</h4>
                <p>{averageRating > 0 ? `${averageRating.toFixed(1)} / 5.0` : 'N/A'}</p>
            </StatsItem>
            <StatsItem>
                <h4>참여 중인 사람 수</h4>
                <p>{activeUsers} 명</p>
            </StatsItem>
        </StatsContainer>
    );
}
// ----------------------------------------


function Home() {
  const { user, logout } = useAuth();
  const { posts } = useBoard();

  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    activeUsers: 0,
  });


  useEffect(() => {

    // 비동기 통계 업데이트 함수 정의
    const updateStats = async () => {

        // 1. 참여 중인 사람 수 (API 호출)
        let userCount = 0;
        try {
            // 백엔드에서 사용자 수를 가져옵니다.
            const res = await fetch("http://localhost:8080/api/auth/users/count");
            if (res.ok) {
                // 백엔드에서 long 타입으로 반환하므로 json()으로 파싱
                userCount = await res.json();
            }
        } catch(error) {
            console.error("사용자 수 로드 실패:", error);
        }

        // 2. 총 리뷰 수 및 평점 평균 계산 (posts 상태 사용)
        const totalReviews = posts.length;
        let totalScoreSum = 0;

        posts.forEach(post => {
            // post 객체의 'score' 속성 (별점)을 사용
            if (typeof post.score === 'number') {
                totalScoreSum += post.score;
            }
        });

        const averageRating = totalReviews > 0 ? totalScoreSum / totalReviews : 0;

        // 3. 상태 업데이트
        setStats({
            totalReviews: totalReviews,
            averageRating: averageRating,
            activeUsers: userCount, // API에서 가져온 값 사용
        });
    };

    updateStats();

    // posts 배열이 변경될 때마다 통계를 재계산합니다.
  }, [posts]);


  // user 객체가 null인 경우를 대비하여 로딩 상태를 표시하거나 리다이렉트 처리가 필요할 수 있습니다.
  if (!user) {
    return <Container>로그인이 필요합니다.</Container>;
  }

  
  return (
    <Container>

      {/* 사용자 환영 메시지 */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          color: "#00796B", 
          fontSize: "24px",
          backgroundColor: "#B2DFDB", 
          padding: "10px",
          borderRadius: "10px",
          display: "inline-block"
        }}>
          **{user.id}**님 환영합니다!
        </h3>
      </div>

      <Title>🍽️ 음식 리뷰 게시판 🍽️</Title>

      <Desc>음식의 평가점수를 공유하는 공간입니다!</Desc>

      <StatsBox 
        totalReviews={stats.totalReviews}
        averageRating={stats.averageRating}
        activeUsers={stats.activeUsers}
      />

      <ButtonGroup>
        <Button to="board">글 목록 보기</Button>
        <Button to="top">BEST 3!</Button>
        <LogoutButton onClick={logout}>로그아웃</LogoutButton> 
      </ButtonGroup>


      <Outlet />
    </Container>
  );
}

export default Home;