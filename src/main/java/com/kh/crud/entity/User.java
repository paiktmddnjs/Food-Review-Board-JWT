package com.kh.crud.entity;
// src/main/java/com/example/demo/model/User.java

import com.kh.crud.global.common.CommonEnums;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
public class User {

    @Id
    private String userId;   // 로그인 ID
    private String pw;
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 10, nullable = false)
    @Builder.Default
    private CommonEnums.Role role = CommonEnums.Role.USER;
}
