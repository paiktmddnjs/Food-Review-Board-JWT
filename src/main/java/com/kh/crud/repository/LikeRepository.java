package com.kh.crud.repository;

// LikeRepository.java
import com.kh.crud.dto.PostLikeCountDto;
import com.kh.crud.entity.Like;
import com.kh.crud.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    long countByPost(Post post);

    List<Like> findByUserId(String userId);

    Like findByUserIdAndPost_Id(String userId, Long postId);

    @Query("select l.post.id from LikeEntity l where l.userId = :userId")
    List<Long> findPostIdsByUserId(@Param("userId") String userId);

    @Query("""
    SELECT new com.kh.crud.dto.PostLikeCountDto ( l.post.id, COUNT(l))
    FROM LikeEntity l
    GROUP BY l.post.id
    ORDER BY COUNT(l) DESC
""")
    List<PostLikeCountDto> findPostLikeCounts();
}
