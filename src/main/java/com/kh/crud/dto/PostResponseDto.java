package com.kh.crud.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kh.crud.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class PostResponseDto {

    private Long id;
    private String userId;
    private String title;
    private String content;
    private int score;
    private String image;
    private String category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate date;

    public PostResponseDto(Post post) {
        this.id = post.getId();
        this.userId = post.getUser().getUserId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.score = post.getScore();
        this.image = post.getImage();
        this.category = post.getCategory();
        this.date = post.getDate();
    }
}
