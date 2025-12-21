import styled from 'styled-components';

// -----------------------
// 1. Wrapper: 전체 페이지를 감싸고 중앙 정렬을 담당
// -----------------------
export const Wrapper = styled.div`
   width: 100%;
   max-width: 650px;
   margin: 40px auto;
   padding: 20px;
   text-align: center;


`;

// -----------------------
// 2. Container: 실제 내용을 담는 박스
// -----------------------
export const Container = styled.div`
   background: #ffffff; /* 배경색 */
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 그림

  h1 {
    color: #333;
    margin-bottom: 25px;
    font-size: 1.8rem;
  }
`;

// -----------------------
// 3. FormBox: 입력 필드들을 묶는 컨테이너
// -----------------------
export const FormBox = styled.div`
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  gap: 15px; /* 필드 간 간격 */
  margin-bottom: 20px;
  text-align: left; /* 내부 요소의 텍스트 정렬을 다시 왼쪽으로 복원 */
`;

// -----------------------
// 4. Input & Textarea & Select (공통 스타일)
// -----------------------
const FieldBaseStyle = `
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #5cb85c;
    outline: none;
  }
`;

export const Input = styled.input`
  ${FieldBaseStyle}
`;

export const Textarea = styled.textarea`
  ${FieldBaseStyle}
  resize: vertical; /* 세로 크기 조절만 허용 */
  min-height: 120px;
`;

export const Select = styled.select`
  ${FieldBaseStyle}
  /* Select 박스의 화살표 디자인을 브라우저 기본값 대신 커스터마이징 가능 */
`;

// -----------------------
// 5. Button
// -----------------------
export const Button = styled.button`
  padding: 12px 20px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4cae4c;
  }

`;

// -----------------------
// 6. ImagePreview
// -----------------------
export const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 15px;
  border-radius: 6px;
  border: 1px solid #ddd;
  object-fit: cover;
`;