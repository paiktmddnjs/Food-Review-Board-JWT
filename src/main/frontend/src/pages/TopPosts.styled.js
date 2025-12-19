import styled, { keyframes, css } from 'styled-components'; // ⭐️ css 헬퍼 임포트
import { Link } from 'react-router-dom';

// 애니메이션 정의
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(255, 165, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 165, 0, 0); }
`;

export const Wrapper = styled.div`
  padding: 40px 20px;
  background-color: #fcfcfc;
  min-height: 100vh;
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #d9534f;
  margin-bottom: 10px;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.05);
`;

export const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #777;
  margin-bottom: 40px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

// ⭐️ PostCard를 styled(Link)로 변경하여 클릭 가능하게 만들고,
// 유효하지 않은 DOM prop 오류를 방지합니다.
export const PostCard = styled(Link)`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeIn} 0.5s ease-out forwards;
  position: relative;
  text-align: left;
  text-decoration: none; /* Link 스타일 제거 */
  color: inherit; /* 폰트 색상 상속 */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  /* 순위별 스타일 */
  ${props => props.$rank === 1 && css`
    border: 3px solid gold;
    background: #fffbe6;
    animation: ${pulse} 2s infinite, ${fadeIn} 0.5s ease-out forwards;
  `}
  ${props => props.$rank === 2 && css`
    border: 3px solid silver;
    background: #f8f8f8;
  `}
  ${props => props.$rank === 3 && css`
    border: 3px solid #cd7f32; /* bronze */
  `}
`;

export const RankBadge = styled.span`
  position: absolute;
  top: -15px;
  right: -15px;
  background-color: ${props => 
    props.$rank === 1 ? '#ffc107' : 
    props.$rank === 2 ? '#adb5bd' : 
    '#dc3545'};
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 8px 15px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transform: rotate(5deg);
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  color: #495057;
  margin-bottom: 8px;
`;

export const PostDetails = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #888;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

export const LikeCount = styled.span`
  font-size: 1.2rem;
  color: #dc3545;
  font-weight: bold;
  
  &::before {
    content: "❤️ ";
  }
`;

export const ContentSummary = styled.p`
  color: #333;
  margin-bottom: 15px;
  /* 3줄 요약 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ViewDetailLink = styled(Link)`
  margin-top: 15px;
  color: #5cb85c;
  font-weight: bold;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
  
  &:hover {
    color: #4cae4c;
  }
`;