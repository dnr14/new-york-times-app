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
  position: static;
  width: 295px;
  height: 55px;
  gap: 11px;
`;

const TitleText = styled.a`
  overflow: hidden;
  width: 260px;
  height: 56px;
  font-weight: 600;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: #000000;
`;

const StarImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px;
  position: static;
  width: 24px;
  height: 24px;
  left: 271px;
  top: 0px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const StarImg = styled.img`
  width: 16px;
  height: 16px;
`;

const ArticleBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 295px;
  height: 20px;
`;

const ArticleLeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 200px;
  height: 20px;
  gap: 8px;
`;

const ArticleRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 85px;
  height: 20px;
`;

const DateText = styled.span`
  width: 85px;
  height: 20px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #6d6d6d;
`;

const NewspaperText = styled.span`
  width: 113px;
  height: 20px;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.05em;
  color: #000000;
`;

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
