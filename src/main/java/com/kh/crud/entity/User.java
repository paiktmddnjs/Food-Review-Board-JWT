package com.kh.crud.entity;
// src/main/java/com/example/demo/model/User.java

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    private String id;   // 로그인 ID
    private String pw;
    private String phone;
}
