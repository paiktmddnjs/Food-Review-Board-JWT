package com.kh.crud.controller;

import com.kh.crud.dto.LikeToggleRequestDto;
import com.kh.crud.dto.PostLikeCountDto;
import com.kh.crud.dto.UserLikeDto;
import com.kh.crud.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/likes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LikeController {

    private final LikeService likeService;

    // =============================
    // 1. 좋아요 토글 (DTO 사용)
    // =============================
    @PostMapping("/toggle")
    public ResponseEntity<Void> toggleLike(
            @RequestBody LikeToggleRequestDto request
    ) {
        likeService.toggleLike(request.getUserId(), request.getPostId());
        return ResponseEntity.ok().build(); // 200 OK
    }

    // =============================
    // 2. 특정 사용자의 좋아요 목록 (DTO)
    // =============================
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserLikeDto>> getUserLikes(
            @PathVariable String userId
    ) {
        List<Long> postIds = likeService.getLikedPostIdsByUser(userId);

        List<UserLikeDto> result = postIds.stream()
                .map(UserLikeDto::new)
                .toList();
        System.out.println("result = " + result);
        return ResponseEntity.ok(result); // 200
    }

    // =============================
    // 3. 게시글별 좋아요 수 (이미 DTO 사용)
    // =============================
    @GetMapping("/postlikes")
    public ResponseEntity<List<PostLikeCountDto>> getPostLikeCounts() {

        List<PostLikeCountDto> counts = likeService.getPostLikeCounts();

        if (counts.isEmpty()) {
            return ResponseEntity.noContent().build(); // 204
        }

        return ResponseEntity.ok(counts); // 200
    }
}
