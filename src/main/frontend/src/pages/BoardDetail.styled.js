import { Link } from "react-router-dom";
import styled from "styled-components";

// 전체 래퍼 (화면 중앙 정렬)
export const Wrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
`;

// 📝 Content: 게시글 본문 컨테이너 (이전에 인라인 스타일이 적용되던 부분)
export const Content = styled.div`
  background: #fff7e6; /* 배경색 */
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* 그림자 */
`;

// 가게 이름 및 상단 정보 래퍼
export const StoreHeader = styled.div`
  margin-bottom: 15px;

  h2 {
    margin: 0;
    color: #ff6b00; /* 가게 이름 색상 */
    font-size: 28px;
  }
`;

// 카테고리 텍스트
export const CategoryText = styled.p`
  margin: 5px 0;
  color: #666;
  font-size: 16px;
`;

// 이미지 스타일
export const PostImage = styled.img`
  max-width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
  height: auto;
  object-fit: cover;
`;

// 이미지 없을 때 표시되는 플레이스홀더
export const ImagePlaceholder = styled.p`
  color: #aaa;
  padding: 20px;
  border: 1px dashed #ddd;
  border-radius: 10px;
  margin-bottom: 15px;
`;

// ⭐ 평점 표시 스타일
export const ScoreDisplay = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #f3e62aff; /* 노란색 별 색상 */
  margin-bottom: 15px;
`;

// 제목 (리뷰 제목)
export const Title = styled.h3`
  font-size: 28px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #333; /* 제목 색상 */
  border-bottom: 1px solid #ddd; /* 밑줄 */
`;

// 내용 (리뷰 본문)
export const Text = styled.p`
  font-size: 17px;
  color: #444;
  text-align: left;
  padding: 10px 0;
  line-height: 1.6; /* 줄 간격 */
  margin-top: 10px;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

// 버튼 그룹
export const BtnGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 30px 0 20px 0;
  padding-top: 20px;
  border-top: 1px dashed #FFD7B0;
`;

// 기본 버튼 스타일 정의
const BaseButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
`;

// 수정하기 버튼
export const EditButton = styled(BaseButton)`
  background-color: #4CAF50;
  color: white;

  &:hover {
    background-color: #66BB6A;
    transform: translateY(-1px);
  }
`;

// 삭제하기 버튼
export const DeleteButton = styled(BaseButton)`
  background-color: #F44336;
  color: white;

  &:hover {
    background-color: #E57373;
    transform: translateY(-1px);
  }
`;

// 목록으로 돌아가기 링크
export const HomeLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #FF9800;
  text-decoration: none;
  font-size: 15px;

  &:hover {
    text-decoration: underline;
  }
`;