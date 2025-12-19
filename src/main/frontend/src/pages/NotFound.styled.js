import styled from "styled-components";

// 전체 화면 래퍼 및 중앙 정렬
export const Wrapper = styled.div`
  display: flex;
  width : 100%;
  height : 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #FFF8E1; /* 연한 크림색 배경 */
  color: #333;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 오류 코드 제목
export const Title = styled.h1`
  font-size: 80px;
  color: #FF7043; /* 따뜻한 주황색 */
  margin: 0;
  font-weight: 900;
  letter-spacing: 2px;
`;

// 안내 메시지
export const Message = styled.p`
  font-size: 20px;
  color: #666;
  margin-top: 10px;
  margin-bottom: 30px;

  
`;

// 홈으로 가기 버튼
export const HomeButton = styled.button`
  padding: 12px 25px;
  background-color: #8BC34A; /* 신선한 연두색 */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  box-shadow: 0 4px 10px rgba(139, 195, 74, 0.4);

  &:hover {
    background-color: #689F38;
    transform: translateY(-2px);
  }
`;