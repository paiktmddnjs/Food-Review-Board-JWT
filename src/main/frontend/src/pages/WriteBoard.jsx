import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBoard } from '../context/BoardContext';
import { 
  Wrapper, Container, FormBox, Input, Textarea, Button, Select, ImagePreview
} from './WriteBoard.styled';

function WriteBoard() {
  const { addBoard, updateBoard } = useBoard();

  const [category, setCategory] = useState("일반");
  const [score , setScore] = useState("");  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null); // 이미지 상태
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // -----------------------
  // 이미지 선택 처리
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
  // 글 작성 처리
  // -----------------------
  const handleAdd = () => {
    const num = Number(score);
    if (num < 1 || num > 5) {
      alert("맛점수는 1~5점 사이여야 합니다!");
      return;
    }
    addBoard(category, num, title, content, author, date, image); // 이미지 전달
    navigate("/board");
  };

  // -----------------------
  // 글 수정 처리
  // -----------------------
  const handleUpdate = () => {
    updateBoard(editingId, title, content, author, category, date, image);
    navigate("/board");
  };

  return (
    <Wrapper>
      <Container>
        <h1>맛집 맛평가 작성</h1>
        <FormBox>

          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="기타">기타</option>
          </Select>

          <Input
            type="number"
            placeholder="맛점수 (1~5점)"
            value={score}
            min="1"
            max="5"
            onChange={(e) => setScore(e.target.value)}
          />

          <Input
            type="text"
            placeholder="제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="내용 입력"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Input
            type="text"
            placeholder="작성자 이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

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

          {editingId ? (
            <Button onClick={handleUpdate}>수정 완료</Button>
          ) : (
            <Button onClick={handleAdd}>글 작성</Button>
          )}
        </FormBox>

        <div style={{ paddingRight: "20px" }}>
          <Link to="/">홈으로 가기</Link>
        </div>
      </Container>
    </Wrapper>
  );
}

export default WriteBoard;
