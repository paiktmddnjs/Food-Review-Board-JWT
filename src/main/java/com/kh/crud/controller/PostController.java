package com.kh.crud.controller;

import com.kh.crud.dto.PostResponseDto;
import com.kh.crud.entity.Post;
import com.kh.crud.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    // 전체 게시글 조회
    @GetMapping
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {

        List<PostResponseDto> posts = postService.getAllPost()
                .stream()
                .map(PostResponseDto::new) // new PostResponseDto(post)
                .toList(); // 변환된 Stream 결과를 List로 수집

        return ResponseEntity.ok(posts); // ⭐ 무조건 200 + []
    }


    // 게시글 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(PostResponseDto::new)// API 응답용 객체를 생성 (dto)
                .map(ResponseEntity::ok) // 응답이 있으면 상태 코드 200으로 감싼다.
                .orElse(ResponseEntity.notFound().build());
    }


    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostResponseDto> createPost(@RequestBody Post post) {
        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(new PostResponseDto(createdPost));
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<PostResponseDto> updatePost(
            @PathVariable Long id,
            @RequestBody Post post
    ) {
        return postService.getPostById(id)
                .map(existing -> {
                    post.setId(id);
                    Post updated = postService.updatePost(post);
                    return ResponseEntity.ok(new PostResponseDto(updated));
                })
                .orElse(ResponseEntity.notFound().build());
    }


    // 게시글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.noContent().build(); // 삭제 성공 → 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // 삭제 실패 → 404 Not Found
        }
    }

}
