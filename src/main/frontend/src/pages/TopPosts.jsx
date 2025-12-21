import React, { useMemo } from 'react';
import { useBoard } from '../context/BoardContext';
import { 
  Wrapper, Container, Title, SubTitle, List, PostCard,
  RankBadge, PostTitle, PostDetails, LikeCount, ContentSummary, ViewDetailLink
} from './TopPosts.styled';

function TopPosts() {
  // useBoard에서 posts와 postLikeCounts를 가져옵니다.
  const { posts, likes , topLikesCount } = useBoard();  // postLikeCounts → likes


  const topPosts = useMemo(() => {
    return posts
      .map(post => {
        console.log(
          "🔥 계산 중",
          "postId =", post.id,
          "topLikesCount =", topLikesCount,
          "topLikesCount =", topLikesCount?.[post.id]
        );

        return {
          ...post,
          likeCount: topLikesCount?.[post.id] ?? 0
        };
      })
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3);
  }, [posts, topLikesCount]);


 console.log(posts);
  return (
    <Wrapper>
      <Container>
        <Title>🏆 BEST 3 리뷰 🏆</Title>
        <SubTitle>가장 많은 '좋아요'를 받은 인기 맛평가입니다.</SubTitle>

        <List>
          {topPosts.length === 0 ? (
            <p style={{ color: '#555', fontSize: '1.1rem', padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              아직 작성된 리뷰가 없거나 좋아요 수가 집계되지 않았습니다.
            </p>
          ) : (
            topPosts.map((post, index) => (
              
              <PostCard 
                key={post.id} 
                to={`/board/${post.id}`} 
                $rank={index + 1}
              >
                
                {/* 순위 배지 */}
                <RankBadge $rank={index + 1}>{index + 1}위</RankBadge>
                
                <PostTitle>{post.title}</PostTitle>

                <ContentSummary>
                  {post.content}
                </ContentSummary>

                <PostDetails>
                  <span>
                    작성자: {post.author} ({post.category})
                  </span>
                  <LikeCount>
                    {post.likeCount}
                  </LikeCount>
                </PostDetails>
                
             
             
              </PostCard>
            ))
          )}
        </List>
        
        <div style={{ marginTop: '40px' }}>
          <ViewDetailLink to="/board" style={{ color: '#007bff' }}>
            전체 리뷰 목록으로 돌아가기
          </ViewDetailLink>
        </div>
      </Container>
    </Wrapper>
  );
}

export default TopPosts;