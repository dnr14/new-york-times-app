import { memo, useEffect } from "react";
import styled from "styled-components";
import star from "../assets/images/main/star.svg";
// import starFill from "../assets/images/main/star-fill.svg";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import { fetchNewYorkTimesArticle } from "../modules/slices/homeSlice";
import moment from "moment";
import "moment/locale/ko";
import useInfinityScroll from "../hooks/useInfinityScroll";
import Progress from "../components/Progress";
import ArticleSkeleton from "../components/ArticleSkeleton";

/** 오프셋은 0 부터 시작합니다.
 *  start                         end
 *  offest + 1 * 10 - 9    offest + 1 * 10
 */

const Home = () => {
  const dispatch = useAppDispatch();

  const articles = useTypedSelector(({ home }) => home.docs);
  const { page, status } = useTypedSelector(({ home }) => home);

  const handleObserver = useInfinityScroll(
    page,
    status,
    fetchNewYorkTimesArticle
  );

  useEffect(() => {
    if (articles.length === 0) dispatch(fetchNewYorkTimesArticle(0));
  }, [dispatch, articles]);

  return (
    <div>
      <Progress isLoading={status === "loading" || status === "idle"} />
      {articles.length
        ? articles.map(
            ({ _id, headline, byline, pub_date, source, web_url }, idx) => {
              const { main } = headline;
              const [person] = byline.person;
              // persons이 없는 기사가 있다 디버깅에 사용하자.
              // console.log(person);

              // 최신순으로 정렬 되는지 디버깅할 때 사용
              // console.log(
              //   new Date(pub_date),
              //   moment(pub_date).toNow(),
              //   moment(pub_date).format("YYYY.MM.DD. (dd)")
              // );

              return (
                <ArticleContainer
                  key={_id}
                  href={web_url}
                  ref={articles.length - 4 === idx ? handleObserver : null}
                >
                  <TitleWrapper>
                    <StarImgWrapper>
                      {/* <StarImg src={isScrap ? starFill : star} alt="star" /> */}
                      <StarImg src={star} alt="star" />
                    </StarImgWrapper>
                    <TitleText>{main}</TitleText>
                  </TitleWrapper>
                  <ArticleBottomWrapper>
                    <ArticleLeftWrapper>
                      <NewspaperText>{source}</NewspaperText>
                      <ReportNameText>
                        {person?.firstname ?? "no name"}
                      </ReportNameText>
                    </ArticleLeftWrapper>
                    <ArticleRightWrapper>
                      <DateText>
                        {moment(pub_date).format("YYYY.MM.DD. (dd)")}
                      </DateText>
                    </ArticleRightWrapper>
                  </ArticleBottomWrapper>
                </ArticleContainer>
              );
            }
          )
        : Array.from({ length: 10 }).map((_, idx) => (
            <ArticleSkeleton key={idx} />
          ))}
    </div>
  );
};

const ArticleContainer = styled.a`
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
  overflow: hidden;
  position: static;
  width: 260px;
  height: 56px;
  left: 0px;
  top: 0px;

  font-family: "Apple SD Gothic Neo";
  font-style: normal;
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
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;

  position: static;
  width: 200px;
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
  width: 85px;
  height: 20px;
  left: 227px;
  top: 0px;
`;

const DateText = styled.span`
  position: static;
  left: 0px;
  top: 0px;
  width: 85px;
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
  width: 113px;
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

export default memo(Home);
