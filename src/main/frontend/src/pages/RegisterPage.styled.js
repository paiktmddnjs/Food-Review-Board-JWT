// src/pages/RegisterPage.styled.js

import styled from "styled-components";

// 🎨 색상 팔레트
const colors = {
  primary: "#FF9800", // 메인 컬러 (따뜻한 주황색 - 식욕을 돋우는 색)
  secondary: "#4CAF50", // 보조 컬러 (녹색 - 신선한 재료)
  background: "#FFF8E1", // 배경 (밝은 크림색/아이보리 - 주방 배경)
  card: "#FFFFFF", // 카드/폼 배경
  text: "#eee6e6ff", // 기본 텍스트
  border: "#E0E0E0", // 경계선
};

// 🌟 전체 컨테이너
export const Container = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.background}; /* 크림색 배경 */
  padding: 20px;
  font-family: 'Arial', sans-serif; /* 폰트 설정 */

   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 📝 제목
export const Title = styled.h1`
  font-size: 2.5em;
  color: ${colors.primary}; /* 주황색 메인 컬러 */
  margin-bottom: 30px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
`;

// 📃 폼 컨테이너
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 40px;
  background: ${colors.card}; /* 흰색 카드 배경 */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* 그림자로 입체감 부여 */
`;

// ⌨️ 입력 필드
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  font-size: 1em;
  color: ${colors.text};
  box-sizing: border-box; /* 패딩이 너비에 포함되도록 설정 */
  transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:focus {
    border-color: ${colors.primary};
    box-shadow: 0 0 5px rgba(255, 152, 0, 0.5); /* 포커스 시 주황색 하이라이트 */
    outline: none;
  }

  &::placeholder {
    color: #A0A0A0;
  }
`;

// 🟢 버튼
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.1s;
  box-sizing: border-box;

  /* 첫 번째 버튼 (회원가입 버튼) 스타일 */
  &:first-of-type {
    background-color: ${colors.primary}; /* 메인 컬러 (주황색) */
    color: white;
    margin-bottom: 5px; /* 두 버튼 사이 간격 */

    &:hover {
      background-color: #F57C00; /* 더 진한 주황색 */
    }

    &:active {
      transform: translateY(1px);
    }
  }

  /* 두 번째 버튼 (로그인으로 돌아가기 버튼) 스타일 */
  &:last-of-type {
    background-color: ${colors.card}; /* 카드 배경색 */
    color: ${colors.primary}; /* 텍스트는 메인 컬러 */
    border: 2px solid ${colors.primary}; /* 테두리 추가 */
    margin-top: 5px;

    &:hover {
      background-color: ${colors.primary};
      color: white;
    }
  }
`;