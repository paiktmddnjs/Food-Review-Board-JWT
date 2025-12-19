package com.kh.crud.repository;

// LikeRepository.java
import com.kh.crud.entity.Like;
import com.kh.crud.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    long countByPost(Post post);
    List<Like> findByUserId(String userId);
    Like findByUserIdAndPost_Id(String userId, Long postId);
}
