package com.kh.crud.service;
// src/main/java/com/example/demo/service/PostService.java

import com.kh.crud.dto.PostDto;
import com.kh.crud.entity.Post;
import com.kh.crud.entity.User;
import com.kh.crud.repository.PostRepository;
import com.kh.crud.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public Post createPost(PostDto dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("유저 없음"));

        Post post = new Post();
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setCategory(dto.getCategory());
        post.setScore(dto.getScore());
        post.setImage(dto.getImage());
        post.setDate(dto.getDate());
        post.setUser(user); // ⭐ 핵심

        return postRepository.save(post);
    }

    public Optional<Post> getPostById(Long id) {

        return postRepository.findById(id);
    }

    public List<Post> getAllPost() {

        return postRepository.findAll();
    }

    public Post updatePost(Post post) {

        return postRepository.save(post);
    }

    public boolean deletePost(Long id) {
        // 존재할수도 아닐수도 있는 id를 조회한다.(optional)
        Optional<Post> optionalPost = postRepository.findById(id);

        if (optionalPost.isPresent()) {
            postRepository.deleteById(id); // 삭제
            return true; // 삭제 성공
        } else {
            return false; // 존재하지 않음
        }
    }



}
