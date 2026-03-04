# 🔐 내가 만든 프로젝트에 JWT 인증 시스템 추가하기(JWT Authentication Guide)

본 프로젝트는 **Spring Security**와 **JWT(JSON Web Token)**를 사용하여 세션을 유지하지 않는(**Stateless**) 인증 시스템을 구현하고 있습니다.

[음식 리뷰 게시판(이전)](https://github.com/paiktmddnjs/React/tree/main/CRUD)
---
<br>

## 🏗️ 1. 프로젝트 내 주요 컴포넌트

### **Backend (Spring Boot)**
| 파일명 | 역할 |
| :--- | :--- |
| `JwtTokenProvider.java` | JWT 토큰 생성, 유효성 검증, 정보 추출을 담당하는 핵심 모듈 |
| `JwtAuthenticationFilter.java` | 모든 HTTP 요청을 가로채서 헤더의 토큰을 검토하는 보안 필터 |
| `SecurityConfig.java` | 세션을 사용하지 않도록(`STATELESS`) 설정하고, JWT 필터를 체인에 등록 |
| `UserService.java` | 로그인 시 사용자 정보를 대조하고 토큰을 발급 요청 |

### **Frontend (React)**
| 파일명 | 역할 |
| :--- | :--- |
| `AuthContext.jsx` | 토큰 및 사용자 정보를 `localStorage`와 React `state`로 전역 관리 |
| `ProtectedRoute.jsx` | 로그인 여부를 확인하여 특정 페이지 접근을 제한하는 라우터 가드 |

---
<br>

## 🚀 2. 상세 흐름 (Sequence Flow)

### **① 사용자 로그인 (Token Issuance)**
1. **Frontend**: 사용자가 아이디와 비밀번호를 입력하고 로그인 요청을 보냅니다.
2. **Backend**: `UserService`에서 `BCryptPasswordEncoder`로 비밀번호 일치 여부를 확인합니다.
3. **Backend**: 검증 성공 시 `JwtTokenProvider`가 사용자의 `userId`와 `role` 정보를 담은 JWT 토큰을 만듭니다.
4. **Backend**: 토큰과 함께 사용자 정보를 클라이언트에게 반환합니다.
5. **Frontend**: 응답받은 토큰을 `localStorage`에 저장하여 새로고침 시에도 유지되도록 합니다.

### **② 인증된 요청 처리 (Authentication)**
1. **Frontend**: 이후 서버에 자원을 요청할 때 HTTP 헤더에 토큰을 실어 보냅니다.
   - `Authorization: Bearer <TOKEN_STRING>`
2. **Backend**: 요청 도착 시 `JwtAuthenticationFilter`가 가동되어 헤더에서 토큰을 추출합니다.
3. **Backend**: `JwtTokenProvider`를 통해 토큰의 유효성(만료, 위변조 등)을 검사합니다.
4. **Backend**: 유효한 토큰이면 `SecurityContext`에 인증 정보를 저장하여 컨트롤러가 인식하게 합니다.

---
<br>

## ⚙️ 3. 기술적 특징
- **Stateless**: 서버가 세션을 유지하지 않아 확장성이 뛰어나며, 클라이언트의 토큰만으로 인증합니다.
- **Security Check**: `/api/auth/**` 경로는 허용하되, 그 외 경로는 토큰 검증을 필수로 수행합니다.
- **Password Security**: `BCrypt` 알고리즘으로 비밀번호를 암호화하여 보안을 강화했습니다.

---
<br>

> [!TIP]
> **로그인 유지 확인**: 브라우저 개발자 도구(F12) -> Application -> Local Storage에서 `user` 키에 저장된 토큰을 확인할 수 있습니다.
