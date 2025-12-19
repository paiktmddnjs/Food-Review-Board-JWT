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
        return userRepository.save(user);
    }

    public Optional<User> login(String id, String pw) {
        return userRepository.findById(id)
                .filter(u -> u.getPw().equals(pw));
    }

    public Optional<User> findById(String id) {
        return userRepository.findById(id);
    }
}
