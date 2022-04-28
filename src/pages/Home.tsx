import { memo, useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import {
  fetchArticles,
  createFetchArticlesPayload,
  setHomeSliceInit,
  setApiStatus,
  setScrap,
} from "../modules/slices/homeSlice";
import "moment/locale/ko";
import useInfinityScroll from "../hooks/useInfinityScroll";
import Progress from "../components/common/Progress";
import { SCROLL_TOP, setYOffset } from "../modules/slices/scrollSlice";
import Article from "../components/Article";
import HomeEmpty from "../components/HomeEmpty";
import ArticleSkeletons from "../components/ArticleSkeletons";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const firstRender = useRef(true);
  const articles = useTypedSelector(({ home }) => home.docs);
  const { page, status, isLastPage, isEmpty } = useTypedSelector(
    ({ home }) => home
  );
  const { selectedDate, headlineKeyword } = useTypedSelector(
    ({ modal }) => modal.filter.home
  );
  const { type } = useTypedSelector(({ modal }) => modal);
  const scrapArticles = useTypedSelector(({ scrap }) => scrap.docs);
  const debounce = useDebounce();
  const dispatch = useAppDispatch();

  const handleObserver = useInfinityScroll(page, status, (page) => {
    if (!isLastPage) {
      dispatch(
        fetchArticles(
          createFetchArticlesPayload(page + 1, selectedDate, headlineKeyword)
        )
      );
    }
  });

  const handleScrapOnClick: HandleScrapOnClick = useCallback(
    (_id) => () => {
      debounce(() => dispatch(setScrap(_id)), 200);
    },
    [dispatch, debounce]
  );

  /* 첫 랜더링 일때 실행됩니다. */
  /* 헤드라인 키워드, 선택된 날짜가 없어야 됩니다. */
  /* 리덕스에 isEmpty가 true가 아닐 때 */
  useEffect(() => {
    if (articles.length === 0 && firstRender.current && !isEmpty) {
      dispatch(fetchArticles(createFetchArticlesPayload(0)));
    }
  }, [articles, isEmpty, dispatch]);

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
      dispatch(
        fetchArticles(
          createFetchArticlesPayload(0, selectedDate, headlineKeyword)
        )
      );
    }
  }, [selectedDate, firstRender, headlineKeyword, dispatch]);

  useEffect(() => {
    /* API를 호출을 했는데 실패 시 스크롤을 top으로 조절합니다. */
    if (status === "failed") dispatch(setYOffset(SCROLL_TOP));
    /* API를 호출하고 있을 때 새로고침을 하면 API status를 초기화를 합니다. */
    if (status === "loading" && firstRender.current) {
      dispatch(setApiStatus("idle"));
    }
    /* 첫 랜더링 유무를 ref로 관리합니다. */
    if (firstRender.current) firstRender.current = false;
  }, [status, dispatch]);

  /* 검색된 기사가 없다면 그려지는 컴포넌트입니다. */
  if (isEmpty) return <HomeEmpty />;
  return (
    <>
      <Progress isLoading={status === "loading"} />
      {articles.length ? (
        articles.map(
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
              isScrap={scrapArticles.some((doc) => doc._id === _id)}
              firstname={byline.person[0]?.firstname ?? "no name"}
              pub_date={pub_date}
              ref={length - 3 === idx ? handleObserver : null}
              handleScrapOnClick={handleScrapOnClick}
            />
          )
        )
      ) : (
        <ArticleSkeletons />
      )}
    </>
  );
};

export default memo(Home);
