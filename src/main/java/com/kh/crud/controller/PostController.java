package com.kh.crud.controller;

import com.kh.crud.dto.PostDto;
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
    public ResponseEntity<List<PostDto>> getAllPosts() {

        List<PostDto> posts = postService.getAllPost()
                .stream()
                .map(PostDto::new) // new PostResponseDto(post)
                .toList(); // 변환된 Stream 결과를 List로 수집

        return ResponseEntity.ok(posts); // ⭐ 무조건 200 + []
    }


    // 게시글 단건 조회
    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id) {
        return postService.getPostById(id)
                .map(PostDto::new)// API 응답용 객체를 생성 (dto)
                .map(ResponseEntity::ok) // 응답이 있으면 상태 코드 200으로 감싼다.
                .orElse(ResponseEntity.notFound().build());
    }


    // 게시글 생성
    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto dto) {
        Post createdPost = postService.createPost(dto);
        return ResponseEntity.ok(new PostDto(createdPost));
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(
            @PathVariable Long id,
            @RequestBody PostDto dto
    ) {
        return postService.getPostById(id)
                .map(existing -> {
                    existing.setTitle(dto.getTitle());
                    existing.setContent(dto.getContent());
                    existing.setCategory(dto.getCategory());
                    existing.setScore(dto.getScore());
                    existing.setImage(dto.getImage());
                    existing.setDate(dto.getDate());
                    // userId는 수정 불가, 기존 값 유지
                    Post updated = postService.updatePost(existing);
                    return ResponseEntity.ok(new PostDto(updated));
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
