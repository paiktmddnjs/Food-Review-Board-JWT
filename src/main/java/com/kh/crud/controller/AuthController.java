package com.kh.crud.controller;
// AuthController.java

import com.kh.crud.entity.User;
import com.kh.crud.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) { //클라이언트가 보낸 JSON을 User 객체로 자동 매핑
        return ResponseEntity.ok(userService.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        return userService.login(user.getId(), user.getPw())
                .map(ResponseEntity::ok)//값이 있으면 .map으로 없으면 orElse로 실행
                .orElse(ResponseEntity.status(401).build());
    }

    @GetMapping("/users/count")
    public ResponseEntity<Long> getUserCount() {
        return ResponseEntity.ok(userService.getUserCount());
    }
}
