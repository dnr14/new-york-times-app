import { memo, useEffect, useRef } from "react";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import {
  fetchArticles,
  createFetchArticlesPayload,
  setHomeSliceInit,
} from "../modules/slices/homeSlice";
import "moment/locale/ko";
import useInfinityScroll from "../hooks/useInfinityScroll";
import Progress from "../components/common/Progress";
import ArticleSkeleton from "../components/common/ArticleSkeleton";
import { SCROLL_TOP, setYOffset } from "../modules/slices/scrollSlice";
import Article from "../components/Article";

const Home = () => {
  const firstRender = useRef(true);
  const articles = useTypedSelector(({ home }) => home.docs);
  const { page, status } = useTypedSelector(({ home }) => home);
  const { selectedDate } = useTypedSelector(({ modal }) => modal.filter.home);
  const dispatch = useAppDispatch();

  const handleObserver = useInfinityScroll(page, status, (page) => {
    dispatch(fetchArticles(createFetchArticlesPayload(page + 1, selectedDate)));
  });

  /* 첫 랜더링 일때 실행됩니다. */
  useEffect(() => {
    if (articles.length === 0 && firstRender.current) {
      dispatch(fetchArticles(createFetchArticlesPayload(0)));
    }
  }, [articles, dispatch]);

  /**
   * 첫 랜더링이 아닌 상태에서 전체 날짜 선택이 변경되면
   * 현재 스크롤 위치를 최상단(top)으로 조절합니다.
   * setYOffset 인수 -1을 전달 시 APP컴포넌트에서 진행합니다.
   * homeSlice를 초기화를 합니다.
   * 전체 날짜 선택(selectedDate)가 null이 아니면
   * api 쿼리파라미터에 begin_date를 넣고 호출합니다.
   */
  useEffect(() => {
    if (!firstRender.current) {
      dispatch(setYOffset(SCROLL_TOP));
      dispatch(setHomeSliceInit());
      // 헤드라인 키워드도 넘겨주면된다.
      dispatch(fetchArticles(createFetchArticlesPayload(0, selectedDate)));
    }
  }, [selectedDate, firstRender, dispatch]);

  /* 첫 랜더링 유무를 ref로 관리합니다. */
  useEffect(() => {
    firstRender.current = false;
  }, []);

  /* API를 호출을 했는데 실패 시 스크롤을 top으로 조절합니다. */
  useEffect(() => {
    if (status === "failed") dispatch(setYOffset(SCROLL_TOP));
  }, [status, dispatch]);

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
                ref={length - 3 === idx ? handleObserver : null}
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
