import { useCallback } from "react";

import ScrapEmty from "../components/ScrapEmty";
import { useAppDispatch, useTypedSelector } from "../modules/store";
import { setScrap } from "../modules/slices/homeSlice";
import Article from "../components/Article";
import useInfinityScroll from "../hooks/useInfinityScroll";
import useDebounce from "../hooks/useDebounce";
import { getScrapArticles } from "../modules/slices/scrapSlice";
import Progress from "../components/common/Progress";
import moment from "moment";

const Scrap = () => {
  const {
    docs: articles,
    page,
    status,
  } = useTypedSelector(({ scrap }) => scrap);
  const { selectedDate, headlineKeyword, selectedCountrys } = useTypedSelector(
    ({ modal }) => modal.filter.scrap,
    /* 배열에 들어있는 문자열의 아스키코드 합이 동일하다면 랜더링을 하지 않습니다. */
    (befor, after) => befor.selectedCountrysHash === after.selectedCountrysHash
  );

  const dispatch = useAppDispatch();
  const debounce = useDebounce();
  const handleObserver = useInfinityScroll(page, status, (page) => {
    /* 마지막 페이지에 도달 했는데 스크랩을 해제됬을 때 방지하기 위해서 입니다. */
    /* 예를 들어 현재 page 3 리스트 27개 */
    /* 삭제를 해서 리스트를 15개로 만든다면 3 === 2 같다라고 처리했으면 없는 리스트를 가져올려고 합니다. */
    /* 하지만 3 >= 2로 제한을해서 더 이상가져오는 걸 방지합니다. */
    if (page >= Math.ceil(articles.length / 10)) return;
    dispatch(getScrapArticles(page + 1));
  });

  const handleScrapOnClick: HandleScrapOnClick = useCallback(
    (_id) => () => debounce(() => dispatch(setScrap(_id)), 200),
    [dispatch, debounce]
  );

  // 일단 날짜와 키워드 검색으로해보자.
  const setArticlesFilter = (doc: Doc) => {
    let isTrue = true;
    // console.log(selectedDate);

    // console.log(doc.pub_date.match(selectedDate ?? moment().toLocaleString()));

    // if (!doc.pub_date.match(selectedDate ?? moment().toLocaleString())) {
    //   isTrue = false;
    // }
    return isTrue;
  };

  return (
    <>
      <Progress isLoading={status === "loading"} />
      {articles.length ? (
        articles
          .slice(0, page * 10)
          .filter(setArticlesFilter)
          .map(
            (
              { _id, headline, byline, pub_date, source, web_url, isScrap },
              idx,
              { length }
            ) => (
              <Article
                key={_id}
                _id={_id}
                web_url={web_url}
                main={headline.main}
                source={source}
                isScrap={isScrap}
                firstname={byline.person[0]?.firstname ?? "no name"}
                pub_date={pub_date}
                ref={length - 3 === idx ? handleObserver : null}
                handleScrapOnClick={handleScrapOnClick}
              />
            )
          )
      ) : (
        <ScrapEmty text="저장된 스크랩이 없습니다." />
      )}
    </>
  );
};

export default Scrap;
