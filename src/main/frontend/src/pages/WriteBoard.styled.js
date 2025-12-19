import styled from "styled-components";

// 전체 화면 래퍼
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단에서 시작 */
  padding: 40px 20px;
  min-height: 100vh;
  background-color: #FFF8E1; /* 연한 크림색 배경 */
`;

// 메인 콘텐츠 컨테이너
export const Container = styled.div`
  width: 100%;
  max-width: 650px;
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 부드러운 그림자 */

  h1 {
    color: #FF7043; /* 따뜻한 주황색 제목 */
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
  }
`;

// 폼 그룹 박스
export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
`;

// 입력 필드 및 선택 박스 공통 스타일
const FieldStyle = `
  padding: 14px 18px;
  border: 1px solid #FFDAB9; /* 연한 음식색 테두리 */
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  background-color: #FAFAFA;

  &:focus {
    border-color: #FF9800; /* 포커스 시 강조 주황 */
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
    outline: none;
    background-color: #FFFFFF;
  }

  &::placeholder {
    color: #9E9E9E;
  }
`;

export const Input = styled.input`
  ${FieldStyle}
`;

export const Select = styled.select`
  ${FieldStyle}
  /* 화살표 스타일 제거 (크로스 브라우징) */
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='currentColor'%3e%3cpath d='M7 7l3 3 3-3m0 6l-3-3-3 3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 18px center;
  background-size: 10px;
`;

export const Textarea = styled.textarea`
  ${FieldStyle}
  height: 150px;
  resize: vertical;
`;

// 버튼 스타일
export const Button = styled.button`
  padding: 15px;
  background-color: #8BC34A; /* 연두색 (신선한 느낌) */
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

// 이미지 미리보기
export const ImagePreview = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;
  border: 2px solid #EEEEEE;
`;

// 메시지 박스 스타일
export const Message = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  background-color: #FFF3E0; /* 연한 주황색 배경 */
  color: #D32F2F; /* 빨간색 텍스트 */
  border: 1px solid #FFCCBC;
`;