import styled from "styled-components";
// import star from "../assets/images/main/Star.svg";
import starFill from "../assets/images/main/StarFill.svg";
import { forwardRef, memo } from "react";
import moment from "moment";

const Article = forwardRef<HTMLDivElement, ArticleProps>(
  ({ web_url, main, source, firstname, pub_date }, ref) => {
    return (
      <ArticleContainer ref={ref}>
        <ArticleTitleWrapper>
          <StarImgWrapper>
            {/* <StarImg src={isScrap ? starFill : star} alt="star" /> */}
            <StarImg src={starFill} alt="star" />
          </StarImgWrapper>
          <TitleText href={web_url}>{main}</TitleText>
        </ArticleTitleWrapper>
        <ArticleBottomContainer>
          <ArticleLeftWrapper>
            <NewspaperText>{source}</NewspaperText>
            <ReportNameText>{firstname}</ReportNameText>
          </ArticleLeftWrapper>
          <ArticleRightWrapper>
            <DateText>{moment(pub_date).format("YYYY.MM.DD. (dd)")}</DateText>
          </ArticleRightWrapper>
        </ArticleBottomContainer>
      </ArticleContainer>
    );
  }
);

const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  width: 335px;
  height: 104px;
  background: #fefefe;
  border-radius: 8px;
  gap: 8px;
`;

const ArticleTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 295px;
  height: 55px;
  gap: 11px;
`;
/* 기사 제목 텍스트 */
const TitleText = styled.a`
  overflow: hidden;
  width: 260px;
  height: 56px;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: -0.05em;
  color: #000000;
`;

/* 스크랩 유무 스타 래퍼 */
const StarImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  width: 24px;
  height: 24px;
  left: 271px;
  top: 0px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

/* 스크랩 유무 스타 */
const StarImg = styled.img`
  width: 16px;
  height: 16px;
`;

/* 기사에 대한 추가 정보 컨테이너 */
const ArticleBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 295px;
  height: 20px;
`;

/* 기사에 대한 추가 왼쪽 래퍼 */
const ArticleLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 200px;
  height: 20px;
  gap: 8px;
`;
/* 기사에 대한 추가 오른쪽 래퍼 */
const ArticleRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 85px;
  height: 20px;
`;
/* 기사 작성 날짜 텍스트 */
const DateText = styled.span`
  width: 85px;
  height: 20px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #6d6d6d;
`;
/* 기사가 작성된 신문사 텍스트 */
const NewspaperText = styled.span`
  width: 113px;
  height: 20px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #000000;
`;

/* 기사를 작성한 기자 이름 텍스트 */
const ReportNameText = styled.span`
  width: 70px;
  height: 20px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #000000;
`;

export default memo(Article);
