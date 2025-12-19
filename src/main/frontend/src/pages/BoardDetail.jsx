import { useParams, useNavigate } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
// ⭐️ useAuth를 가져와 로그인 사용자 정보를 사용합니다.
import { useAuth } from "../context/AuthContext"; 
import {
  Wrapper,
  Content,
  Title,
  Text,
  BtnGroup,
  EditButton,
  DeleteButton,
  HomeLink,
  StoreHeader, 
  CategoryText, 
  ScoreDisplay, 
  PostImage, 
  ImagePlaceholder, 
} from "./BoardDetail.styled";

function BoardDetail() {
  const { id } = useParams();
  const { posts, deleteBoard } = useBoard();
  const { user } = useAuth(); //  로그인 사용자 정보 가져오기
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) return <Wrapper>❌ 게시글을 찾을 수 없습니다.</Wrapper>;
  
  // 현재 로그인된 사용자가 게시글 작성자인지 확인
  // (가정: post 객체에 작성자 ID가 post.userId로 저장되어 있습니다.)
  const isAuthor = user && post.userId === user.id;

  return (
    <Wrapper>
      <Content>
        {/* 상단 정보 */}
        <StoreHeader>
          <h2>{post.store}</h2>
          <CategoryText>
            카테고리: <b>{post.category}</b>
          </CategoryText>
        </StoreHeader>

        {/* 이미지 */}
        <div>
          {post.image ? (
            <PostImage
              src={post.image}
              alt={post.title}
            />
          ) : (
            <ImagePlaceholder>이미지 없음</ImagePlaceholder>
          )}
        </div>

        {/* 맛 점수 표시 */}
        <ScoreDisplay>
          {post.score
            ? "⭐".repeat(Number(post.score))
            : "점수 없음"}
        </ScoreDisplay>

        {/* 제목 */}
        <Title>
          {post.title}
        </Title>

        {/* 내용 */}
        <Text>
          {post.content}
        </Text>

        {/* isAuthor일 때만 버튼 그룹 렌더링 */}
        {isAuthor && (
          <BtnGroup>
            <EditButton onClick={() => navigate(`/edit/${id}`)}>수정하기</EditButton>
            <DeleteButton
              onClick={() => {
                deleteBoard(Number(id));
                navigate("/board");
              }}
            >
              삭제하기
            </DeleteButton>
          </BtnGroup>
        )}

        <HomeLink to="/board">← 맛평가 목록으로 돌아가기</HomeLink>
      </Content>
    </Wrapper>
  );
}

export default BoardDetail;