package com.kh.crud.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "LikeEntity")
@Table(name = "likes",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"userId", "post_id"})})
@Getter
@Setter
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // DB가 자동으로 증가하는 방식
    private Long id;

    private String userId;

    @ManyToOne // 하나의 게시글(Post)에 여러 좋아요(Like) 가능
    @JoinColumn(name = "post_id") // Like 테이블에서 Post 테이블 참조용 FK 생성
    @JsonIgnore  // ⭐ Like → Post 역참조 차단 즉 Like를 JSON으로 보낼 때 Post 정보는 제외
    private Post post;
}