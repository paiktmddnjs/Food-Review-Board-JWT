import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  ButtonGroup,
} from "./LoginPage.styled";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(id, pw);

    if (result) {
      alert("로그인 성공!");
      navigate("/");
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다!");
    }
  };

  return (
    <Container>
      <Title>로그인</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <Input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <ButtonGroup>
          <Button type="submit">로그인</Button>
          <Button type="button" onClick={() => navigate("/register")} secondary>
            회원가입
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
