import { Link } from "react-router-dom";
import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  width: 80%; /* 중앙 정렬을 위해 너비 제한 */
  max-width: 1000px;
  margin: 40px auto; /* 중앙 배치 및 상하 여백 */
  padding: 30px;
  background-color: #FFFFFF; /* 밝은 배경 */
  border-radius: 15px; /* 모서리 둥글게 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 은은한 그림자 */
  text-align: center;

  h1 {
    color: #FF7043; /* 제목 색상 (주황 계열) */
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

// 글쓰기 버튼을 담는 박스 (오른쪽 정렬)
export const WriteBox = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽으로 정렬 */
  margin-bottom: 20px;
`;

// Link 기반의 스타일링된 버튼
export const StyledLink = styled(Link)`
  padding: 10px 18px;
  background-color: #8BC34A; /* 연두색 계열 (신선한 느낌) */
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #9CCC65;
  }
`;

// 게시글 목록 (그리드 또는 플렉스로 조정)
export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 반응형 그리드 */
  gap: 20px;
  margin-top: 30px;
`;

// 개별 게시글 카드
export const Card = styled.li`
  cursor: pointer;
  padding: 20px;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  text-align: left;
  background-color: #FAFAFA;
  position: relative; /* 하트 버튼의 absolute 포지셔닝을 위해 필수 */
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    border-color: #FFB74D;
  }
  
  h2 {
    color: #333333 !important;
    font-size: 22px;
    margin-top: 0;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    color: #666666;
    font-size: 15px;
    line-height: 1.4;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
  }
`;

// ❤️ 하트 버튼 스타일 (우측 상단으로 이동)
export const HeartButton = styled.button`
  position: absolute;
  top: 10px; /* ⭐️ bottom 대신 top 사용 */
  right: 10px; /* Card 우측에서 띄우기 */
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 5px;
  color: ${props => (props.$isLiked ? '#FF6B6B' : '#CCCCCC')};/* 클릭 시 색상 변경 */
  transition: transform 0.1s ease, color 0.2s ease;
  z-index: 10; 

  &:hover {
    transform: scale(1.1);
  }
  
  /* ⭐️ 포커스 시 발생하는 검은색 테두리 제거 */
  &:focus {
    outline: none; 
  }
`;
// 날짜 텍스트 (우측 하단 배치)
export const DateText = styled.span`
  display: block;
  text-align: right;
  font-size: 12px;
  color: #9E9E9E;
  margin-top: 10px;
`;

// 홈으로 가기 링크 래퍼
export const HomeLinkWrapper = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #EEEEEE; /* 구분선 */
`;