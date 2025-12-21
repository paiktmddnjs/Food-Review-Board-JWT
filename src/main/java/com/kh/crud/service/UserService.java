package com.kh.crud.service;

// UserService.java

import com.kh.crud.entity.User;
import com.kh.crud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User register(User user) {

        return userRepository.save(user); //DB에 User 엔티티 저장
    }


    public Optional<User> login(String id, String pw) {
        return userRepository.findById(id)
                .filter(u -> u.getPw().equals(pw)); // 비밀번호 일치하면 Optional<User> 반환, 아니면 Optional.empty()반환
    }


    public Long getUserCount() {

        return userRepository.count(); //DB에 저장된 전체 User 수 반환
    }


}
