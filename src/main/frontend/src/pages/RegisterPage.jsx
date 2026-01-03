// src/pages/RegisterPage.jsx (API 연동)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Title, Form, Input, Button } from "./RegisterPage.styled";

export default function RegisterPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [phone, setPhone] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  // ----------------------------------------------------
  // 🔥 회원가입 처리 (API 호출로직으로 변경)
  // ----------------------------------------------------
  const handleRegister = async () => {
    if (!id || !pw || !phone) {
      alert("아이디, 비밀번호, 전화번호를 모두 입력하세요.");
      return;
    }

    // 1. 전화번호 형식 검사 (클라이언트 측 검사는 유지)
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phoneRegex.test(phone)) {
      alert("전화번호 형식이 올바르지 않습니다. xxx-xxxx-xxxx 형태로 입력해주세요.");
      return;
    }

    const newUser = { userId: id , pw, phone };

    try {
      const res = await register(newUser);

      console.log(res.data);   // "test123"
      console.log(res.status); // 200

      alert("회원가입 완료! 로그인해 주세요.");
      navigate("/login");

    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);

      if (error.response) {
        alert(error.response.data); // 백엔드 에러 메시지
      } else {
        alert("서버와 통신에 실패했습니다.");
      }
    }
  };
  // ----------------------------------------------------

  return (
    <Container>
      <Title>회원가입</Title>

      <Form>
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

        <Input
          type="tel"
          placeholder="전화번호 : xxx-xxxx-xxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button onClick={handleRegister}>회원가입</Button>
        <Button type="button" onClick={() => navigate("/login")}>
          로그인으로 돌아가기
        </Button>
      </Form>
    </Container>
  );
}