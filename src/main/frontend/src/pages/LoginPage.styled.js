import styled from "styled-components";

// 전체 컨테이너: 화면 중앙에 배치되며, 음식 관련 앱처럼 따뜻한 배경색과 그림자를 사용합니다.
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  width: 100%; /* ⭐️ 전체 너비 보장 */
  height: 100%; /* 뷰포트 전체 높이 사용 */
  padding: 20px;
  background-color: #FFF8E1; /* 연한 크림색 배경 */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 로그인 폼 박스: 콘텐츠를 감싸는 영역
export const LoginBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(255, 112, 67, 0.2); /* 주황색 계열의 부드러운 그림자 */
  /* ⭐️ Container가 중앙에 배치하므로 이 자체는 flex 설정을 제거했습니다. */
`;

// 제목: 음식 테마를 강조하는 스타일
export const Title = styled.h1`
  font-size: 32px;
  color: #FF7043; /* 따뜻한 주황색 (음식 테마 강조) */
  margin-bottom: 30px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;

  &::before {
    content: "🍳"; /* 이모티콘 추가 */
    margin-right: 10px;
  }
`;

// 폼 요소
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// 입력 필드: 둥근 모서리와 깔끔한 포커스 효과
export const Input = styled.input`
  padding: 14px 18px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    border-color: #FFB74D; /* 포커스 시 밝은 주황색 */
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 183, 77, 0.3);
  }
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

// 버튼 기본 스타일
export const Button = styled.button`
  flex-grow: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;

  /* Primary Button (로그인) */
  background-color: ${(props) => (props.secondary ? '#BDBDBD' : '#FF7043')}; /* 주황색 */
  color: white;

  &:hover {
    background-color: ${(props) => (props.secondary ? '#A1A1A1' : '#E65100')}; /* 어두운 주황색 */
    transform: translateY(-1px);
  }
`;