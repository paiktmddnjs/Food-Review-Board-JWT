import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useBoard } from "../context/BoardContext";
import {
  Wrapper, Container, FormBox, Input, Textarea, Button, Select, ImagePreview
} from "./EditBoard.styled";

function EditBoard() {
  const { posts, updateBoard } = useBoard();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  // URL 파라미터에서 받은 id를 숫자로 변환하여 해당 게시글 찾기
  const boardItem = posts.find((item) => item.id === Number(id));

  // WriteBoard.js의 상태를 모두 추가하고, 기본값은 빈 문자열 또는 null로 설정
  const [category, setCategory] = useState("한식"); // 기본 카테고리
  const [score, setScore] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // Base64 문자열 또는 null

  // -----------------------
  // 기존 데이터 불러오기 (useEffect)
  // -----------------------
  useEffect(() => {
    if (boardItem) {
      // 기존 데이터로 상태 초기화
      setCategory(boardItem.category || "한식");
      setScore(String(boardItem.score) || "");
      setTitle(boardItem.title || "");
      setContent(boardItem.content || "");
      setAuthor(boardItem.author || "");
      setDate(boardItem.date || "");
      setImage(boardItem.image || null); // 기존 이미지가 있다면 설정
    }
  }, [boardItem]);

  // -----------------------
  // 이미지 선택 처리 (WriteBoard.js의 로직 재사용)
  // -----------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Base64 문자열로 저장
      };
      reader.readAsDataURL(file);
    }
  };

  // -----------------------
  // 글 수정 처리 (WriteBoard.js의 handleUpdate 로직을 기반으로 수정)
  // -----------------------
  const handleUpdate = async () => {

    const num = Number(score);

    // 맛점수 유효성 검사 (WriteBoard.js의 로직 재사용)
    if (num < 1 || num > 5) {
      alert("맛점수는 1~5점 사이여야 합니다!");
      return;
    }

    const postData = {
        title,
        content,
        author: user.id,
        category,
        date,
        image,
        score: num,
      };

    // updateBoard 함수에 모든 필드 전달
     const success = await updateBoard(Number(id), postData);

    if (success) {
    alert("수정 성공!");
    navigate("/board");
  }else {
         alert("수정에 실패했습니다!ㅠㅠ");
       }
   };

  // -----------------------
  // 게시글이 없을 때
  // -----------------------
  if (!boardItem) return <div> 해당 게시글을 찾을 수 없습니다.</div>;

  return (
    <Wrapper>
      <Container>
        <h1>🍽️ 맛집 맛평가 수정</h1>

        <FormBox>

          {/* 카테고리 */}
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
          </Select>

          {/* 맛점수 */}
          <Input
            type="number"
            placeholder="맛점수 (1~5점)"
            value={score}
            min="1"
            max="5"
            onChange={(e) => setScore(e.target.value)}
          />

          {/* 제목 */}
          <Input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* 내용 */}
          <Textarea
            placeholder="내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* 작성자 */}
          <Input
            type="text"
            placeholder="작성자 이름"
            value={user?.id || ""}
            onChange={(e) => setAuthor(e.target.value)}
            readOnly
          />

          {/* 날짜 */}
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          {/* 이미지 업로드 */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <ImagePreview src={image} alt="미리보기" />}

          <Button onClick={handleUpdate}>
            수정 완료
          </Button>
        </FormBox>

        <div style={{ paddingRight: "20px" }}>
          <Link to="/board">목록으로 돌아가기</Link>
        </div>
      </Container>
    </Wrapper>
  );
}

export default EditBoard;