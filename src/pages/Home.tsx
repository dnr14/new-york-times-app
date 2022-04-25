import { memo, useEffect, useRef } from "react";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import {
  fetchArticles,
  payloadCreator,
  setHomeSliceInit,
} from "../modules/slices/homeSlice";
import "moment/locale/ko";
import useInfinityScroll from "../hooks/useInfinityScroll";
import Progress from "../components/common/Progress";
import ArticleSkeleton from "../components/common/ArticleSkeleton";
import { setYOffset } from "../modules/slices/scrollSlice";
import Article from "../components/Article";

const Home = () => {
  const firstRender = useRef(true);
  const articles = useTypedSelector(({ home }) => home.docs);
  const { page, status } = useTypedSelector(({ home }) => home);
  const { selectedDate } = useTypedSelector(({ modal }) => modal.filter);
  const dispatch = useAppDispatch();

  const handleObserver = useInfinityScroll(page, status, (page) => {
    dispatch(fetchArticles(payloadCreator(page + 1, selectedDate)));
  });

  // 1. 첫 랜더링 일때 실행됩니다.
  useEffect(() => {
    if (articles.length === 0) {
      dispatch(fetchArticles(payloadCreator(0)));
    }
  }, []);

  /**
   * 1. 첫 랜더링이 아니고
   * 2. 선택된 날짜가 있고
   */
  useEffect(() => {
    if (!firstRender.current) {
      dispatch(setYOffset(-1));
      dispatch(setHomeSliceInit());
      if (selectedDate !== null) {
        dispatch(fetchArticles(payloadCreator(0, selectedDate)));
      } else {
        dispatch(fetchArticles(payloadCreator(0)));
      }
    }
  }, [selectedDate, firstRender, dispatch]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  useEffect(() => {
    if (status === "loading") {
    }
  }, []);

  // persons이 없는 기사가 있다 디버깅에 사용하자.
  // console.log(person);

  // 최신순으로 정렬 되는지 디버깅할 때 사용
  // console.log(
  //   new Date(pub_date),
  //   moment(pub_date).toNow(),
  //   moment(pub_date).format("YYYY.MM.DD. (dd)")
  // );
  return (
    <>
      <Progress isLoading={status === "loading" || status === "idle"} />
      {articles.length
        ? articles.map(
            (
              { _id, headline, byline, pub_date, source, web_url },
              idx,
              { length }
            ) => (
              <Article
                key={_id}
                _id={_id}
                web_url={web_url}
                main={headline.main}
                source={source}
                firstname={byline.person[0]?.firstname ?? "no name"}
                pub_date={pub_date}
                ref={length - 4 === idx ? handleObserver : null}
              />
            )
          )
        : Array.from({ length: 10 }).map((_, idx) => (
            <ArticleSkeleton key={idx} />
          ))}
    </>
  );
};

export default memo(Home);
