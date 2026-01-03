package com.kh.crud.entity;
// src/main/java/com/example/demo/model/User.java

import com.kh.crud.global.common.CommonEnums;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(nullable = false, unique = true)
    private String userId;   // 로그인 ID

    @Column(nullable = false)
    private String pw;

    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    @Builder.Default
    private CommonEnums.Role role = CommonEnums.Role.USER;
}
