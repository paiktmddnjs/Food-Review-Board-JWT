// src/pages/RegisterPage.jsx (API 연동)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Title, Form, Input, Button } from "./RegisterPage.styled";

export default function RegisterPage() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [phone, setPhone] = useState("");

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

    const newUser = { id, pw, phone };

    try {
      // 2. 백엔드 API 호출
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        // 성공 (백엔드에서 201 Created 반환 시)
        alert("회원가입 완료! 로그인해 주세요.");
        navigate("/login");
      } else if (res.status === 400) {
        // 백엔드에서 보낸 아이디/전화번호 중복 에러 처리
        const errorText = await res.text();
        alert(`회원가입 실패: ${errorText}`);
      } else {
        alert("회원가입 중 알 수 없는 오류가 발생했습니다.");
      }

    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("서버와 통신에 실패했습니다.");
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