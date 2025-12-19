import { useNavigate } from "react-router-dom";
import { Wrapper, Title, Message, HomeButton } from "./NotFound.styled";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      {/* 404 오류 코드 */}
      <Title>404 ERROR</Title>
      
      {/* 사용자 친화적인 메시지 */}
      <Message>
        요청하신 맛집 리뷰 페이지를 찾을 수 없습니다. ㅠㅠ
      </Message>
      
      {/* 스타일이 적용된 버튼 */}
      <HomeButton
        type="button"
        onClick={() => navigate("/")}
      >
        홈으로 가기
      </HomeButton>
    </Wrapper>
  );
}

export default NotFound;