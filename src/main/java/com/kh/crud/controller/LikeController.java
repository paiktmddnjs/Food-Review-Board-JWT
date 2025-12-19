package com.kh.crud.controller;


import com.kh.crud.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LikeController {
    private final LikeService likeService;

    @PostMapping("/toggle")
    public void toggleLike(@RequestParam String userId, @RequestParam Long postId) {
        likeService.toggleLike(userId, postId);
    }

    @GetMapping("/post/{postId}/count")
    public long getPostLikeCount(@PathVariable Long postId) {
        return likeService.getPostLikeCount(postId);
    }
}
