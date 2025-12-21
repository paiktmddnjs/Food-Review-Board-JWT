package com.kh.crud.dto;

import com.kh.crud.entity.Post;
import lombok.Getter;

@Getter
public class PostResponseDto {

    private Long id;
    private String userId;
    private String title;
    private String content;
    private int score;
    private String image;
    private String category;
    private String date;

    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.userId = post.getUserId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.score = post.getScore();
        this.image = post.getImage();
        this.category = post.getCategory();
        this.date = String.valueOf(post.getDate());
    }
}
