import { useCallback, useMemo } from "react";
import ScrapEmty from "../components/ScrapEmty";
import {
  useAppDispatch,
  useModalTypeSelector,
  useTypedSelector,
} from "../modules/store";
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
  const { selectedDate, headlineKeyword, selectedCountrys } =
    useModalTypeSelector("scrap");

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

  /* 스크랩을 필터링하여 보여주는 기능입니다. */
  const setArticlesFilter = useCallback(
    ({ pub_date, headline: { main }, keywords }: Doc) => {
      let isTrue = true;

      /* 선택된 날짜와 스크랩 날짜가 다르면 isTrue는 false로 변경합니다. */
      function isNotMathSelectedDate(selectedDate: StringOrNull) {
        return (
          selectedDate !== null &&
          moment(pub_date).format("YYYY.MM.DD") !== selectedDate
        );
      }

      /* 검색한 헤드라인 키워드와 스크랩의 헤드라인이 다르면 isTrue는 false로 변경합니다. */
      function isNotMathHeadlineKeyword(headlineKeyword: StringOrNull) {
        return (
          headlineKeyword !== null &&
          !main?.match(new RegExp(headlineKeyword, "i"))
        );
      }

      /* 선택된 국가와 스크랩의 국가가 다르면 isTrue는 false로 변경합니다. */
      function isNotMathCountry(
        selectedCountrys: CountryEnglNameType[] | null
      ) {
        return (
          selectedCountrys !== null &&
          keywords.some(
            ({ name, value }) =>
              name === "glocations" &&
              !selectedCountrys.some((country) =>
                country.match(new RegExp(value, "i"))
              )
          )
        );
      }

      if (isNotMathSelectedDate(selectedDate)) isTrue = false;
      if (isNotMathHeadlineKeyword(headlineKeyword)) isTrue = false;
      if (isNotMathCountry(selectedCountrys)) isTrue = false;
      return isTrue;
    },
    [selectedDate, headlineKeyword, selectedCountrys]
  );

  const articlesFilter = useMemo(
    () => articles.slice(0, page * 10).filter(setArticlesFilter),
    [articles, page, setArticlesFilter]
  );

  return (
    <>
      <Progress isLoading={status === "loading"} />
      {articlesFilter.length ? (
        articlesFilter.map(
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
              firstname={byline.person[0]?.firstname ?? "No Name"}
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
