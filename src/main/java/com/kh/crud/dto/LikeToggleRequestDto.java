package com.kh.crud.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeToggleRequestDto {
    private String userId;
    private Long postId;
}
