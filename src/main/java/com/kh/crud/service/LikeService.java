package com.kh.crud.service;



import com.kh.crud.entity.Like;
import com.kh.crud.entity.Post;
import com.kh.crud.repository.LikeRepository;
import com.kh.crud.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;

    public long getPostLikeCount(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow();
        return likeRepository.countByPost(post);
    }

    public List<Like> getUserLikes(String userId) {
        return likeRepository.findByUserId(userId);
    }

    public void toggleLike(String userId, Long postId) {
        Like existing = likeRepository.findByUserIdAndPost_Id(userId, postId);
        if (existing != null) {
            likeRepository.delete(existing);
        } else {
            Post post = postRepository.findById(postId).orElseThrow();
            Like like = new Like();
            like.setPost(post);
            like.setUserId(userId);
            likeRepository.save(like);
        }
    }
}
