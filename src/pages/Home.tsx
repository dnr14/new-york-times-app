import { useEffect, useState } from "react";
import styled from "styled-components";
import star from "../assets/images/main/star.svg";
import starFill from "../assets/images/main/star-fill.svg";
import http from "../api/http";

const articleInit = [
  {
    id: 1,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: true,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 2,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 3,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 4,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 5,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 6,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 7,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 8,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 9,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
  {
    id: 10,
    title: "국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작",
    isScrap: false,
    newspaper: "조선일보",
    reporterName: "김정확 기자",
    date: "2021.3.15 (목)",
  },
];

const Home = () => {
  const [article] = useState(articleInit);

  useEffect(() => {
    http
      .get(
        "/articlesearch.json?api-key=ElAiRLr5DLBdfiNA5xi3xUP1dPDVbS3B&begin_date=20220419&page=0"
      )
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      {article.map(({ id, title, isScrap, newspaper, reporterName, date }) => {
        return (
          <ArticleWrapper key={id}>
            <TitleWrapper>
              <StarImgWrapper>
                <StarImg src={isScrap ? starFill : star} alt="star" />
              </StarImgWrapper>
              <TitleText>{title}</TitleText>
            </TitleWrapper>
            <ArticleBottomWrapper>
              <ArticleLeftWrapper>
                <NewspaperText>{newspaper}</NewspaperText>
                <ReportNameText>{reporterName}</ReportNameText>
              </ArticleLeftWrapper>
              <ArticleRightWrapper>
                <DateText>{date}</DateText>
              </ArticleRightWrapper>
            </ArticleBottomWrapper>
          </ArticleWrapper>
        );
      })}
    </div>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  position: static;
  width: 335px;
  height: 104px;
  left: 0px;
  top: 0px;
  background: #fefefe;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 8px 0px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  position: static;
  width: 295px;
  height: 56px;
  left: 20px;
  top: 10px;
`;

const TitleText = styled.div`
  position: static;
  width: 260px;
  height: 56px;
  left: 0px;
  top: 0px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
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
  position: static;
  width: 16px;
  height: 16px;
  left: 4px;
  top: 4px;
`;

const ArticleBottomWrapper = styled.div`
  /* Frame 27322 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 295px;
  height: 20px;
  left: 20px;
  top: 74px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 8px 0px;
`;

const ArticleLeftWrapper = styled.div`
  /* Frame 27326 */

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 140px;
  height: 20px;
  left: 0px;
  top: 0px;
`;

const ArticleRightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 75px;
  height: 20px;
  left: 227px;
  top: 0px;
`;

const DateText = styled.span`
  position: static;
  left: 0px;
  top: 0px;
  width: 75px;
  height: 20px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;

  letter-spacing: -0.05em;

  color: #6d6d6d;
`;

const NewspaperText = styled.span`
  position: static;
  width: 54px;
  height: 20px;
  left: 0px;
  top: 0px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  letter-spacing: -0.05em;

  /* Black 100 */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ReportNameText = styled.span`
  position: static;
  width: 70px;
  height: 20px;
  left: 52px;
  top: 0px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  letter-spacing: -0.05em;

  /* Black 100 */

  color: #000000;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0 8px;
`;

export default Home;
