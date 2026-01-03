package com.kh.crud.service;

// UserService.java

import com.kh.crud.dto.UserDto;
import com.kh.crud.entity.User;
import com.kh.crud.global.security.JwtTokenProvider;
import com.kh.crud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public String register(UserDto.Request request) {

        if (userRepository.existsByUserId(request.getUserId())) {
            throw new IllegalArgumentException("이미 존재하는 사용자 ID입니다.");
        }

        // 평문 비밀번호 → 해시된 비밀번호로 변환
        String encodedPw = passwordEncoder.encode(request.getPw());

        // 3. DTO → Entity 변환
        User user = User.builder()
                .userId(request.getUserId())
                .pw(encodedPw)
                .phone(request.getPhone())
                .build();

        userRepository.save(user); //DB에 User 엔티티 저장
        return user.getUserId();
    }


    public UserDto.LoginResponse login(UserDto.LoginRequest request) {

        //1. 회원조회
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("아이디 일치하지 않습니다."));

        //2. 비밀번호 확인(검증) : 사용자가 입력한 비밀번호가 DB에 저장된 암호화된 비밀번호와 일치하는지 검증한다
        if(!passwordEncoder.matches(request.getPw(), user.getPw())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }

        String userId = user.getUserId();
        String role = user.getRole().name();

        // JWT 생성
        String token = jwtTokenProvider.generateToken(userId, role);

        return UserDto.LoginResponse.builder()
                .userId(userId)
                .role(role)
                .token(token)
                .build();
    }


    public Long getUserCount() {

        return userRepository.count(); //DB에 저장된 전체 User 수 반환
    }


}
