// src/main/java/com/example/demo/model/Post.java

package com.kh.crud.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "posts")
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String author;   // 작성자 이름
    private String category;
    private Integer score;
    private LocalDate date;
    @Lob
    private String image;    // Base64 문자열
    private String userId;   // 작성자 로그인 ID

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Like> likes;
}
