package com.kh.crud.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostLikeCountDto {

    private Long postId;
    private Long likeCount;


}