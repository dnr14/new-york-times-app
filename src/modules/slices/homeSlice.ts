import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "../../api/http";
import { ThunkApi } from "../store";
import { addScrap, deleteScrap } from "./scrapSlice";

const BASE_URL = `/articlesearch.json?${process.env.REACT_APP_NEW_YORK_TIMES_KEY}`;
const NAME = "home";

const createError = ({ message }: Error): HomeSliceError => ({
  isError: true,
  message,
});

const createEndPoint: CreateEndPointFunc = (
  page,
  beginDate,
  headlineKeyword,
  selectedCountrys
) => {
  const removeSearchWord = (
    cur: CountryEnglNameType,
    target: CountryEnglNameType,
    soruce: CountryEnglNameType,
    countrys: CountryEnglNameType[]
  ) => cur === target && !countrys.some((country) => country === soruce);

  let url = `${BASE_URL}&page=${page}`;
  if (beginDate) url += `&begin_date=${beginDate.replace(/\./gi, "")}`;
  if (headlineKeyword) url += `&fq=headline:("${headlineKeyword}")`;
  if (selectedCountrys) {
    url += selectedCountrys.reduce((acc, cur, idx, _this) => {
      acc += !headlineKeyword && !idx ? "&fq=" : " OR ";
      acc += `glocations:("${cur}")`;

      /*
       * 대한민국, 북한이 같이 선택되지 않았다면 검색에서 제외시켜야됩니다.
       * glocations 필드에서 "north korea"가 아닌 "south korea"라는 단어를 검색하tpd
       * 대한민국만 있다면 glocations:("south korea") -glocations:("north korea")
       * 대한민국만 있다면 glocations:("north korea") -glocations:("south korea")
       */
      if (removeSearchWord(cur, "south korea", "north korea", _this))
        acc += ' -glocations:("north korea")';
      else if (removeSearchWord(cur, "north korea", "south korea", _this))
        acc += ' -glocations:("south korea")';

      return acc;
    }, "");
  }

  /*
   * 1. 선택된 날짜가 없으면 최신순으로 보여줍니다.
   * 2. 선택된 날짜는 있으면 오래된 순으로 보여줍니다.
   */
  url += `&sort=${beginDate ? "oldest" : "newest"}`;
  return `${url}`;
};

const convertArticles = <T, S>(docs: T[], source: S) => {
  return docs.map((doc) => ({ ...doc, ...source }));
};
const isLast = (offset: number, hits: number) => {
  return Math.floor(offset / 10) === Math.floor(hits / 10);
};

export const createFetchArticlesPayload: CreateFetchArticlesPayloadFunc = (
  page,
  beginDate = null,
  headlineKeyword = null,
  selectedCountrys = null
) => ({
  page,
  beginDate,
  headlineKeyword,
  selectedCountrys,
});

/**
 * 전체 날짜없을 때 호출하는 썽크입니다.
 */
export const fetchArticles = createAsyncThunk<
  HomeSliceInit,
  FetchArticlesThunkPayload
>(
  `${NAME}/GET/ARTICLES`,
  async (
    { page, beginDate, headlineKeyword, selectedCountrys },
    { rejectWithValue }
  ) => {
    try {
      const response = await http.get<HomeSliceInit>(
        createEndPoint(page, beginDate, headlineKeyword, selectedCountrys)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setScrap = createAsyncThunk<void, string, ThunkApi>(
  `${NAME}/SET_SCRAP`,
  async (_id, { getState, dispatch }) => {
    const findDoc = (doc: Doc) => doc._id === _id;

    const { scrap, home } = getState();
    if (scrap.docs.some(findDoc)) {
      /* 스크랩에 값이 있다면 삭제합니다. */
      dispatch(deleteScrap(_id));
      dispatch(setScrapStatus("remove"));
    } else {
      /* 스크랩에 값이 없다면 추가합니다. */
      const doc = home.docs.find(findDoc);
      if (doc) {
        dispatch(addScrap({ ...doc, isScrap: true }));
        dispatch(setScrapStatus("add"));
      }
    }

    /* add => idle */
    /* remove => idle */
    /* 상태가 바로 변하는걸 방지하기위해 딜레이를 주었습니다. */
    const delay = (time: number) => new Promise((res) => setTimeout(res, time));
    await delay(1000);
  }
);

const initialState: HomeSliceInit = {
  docs: [],
  meta: {
    hits: 0,
    offset: 0,
    time: 0,
  },
  page: 0,
  status: "idle",
  isLastPage: false,
  isEmpty: false,
  error: {
    isError: false,
    message: null,
  },
  scrapStatus: "idle",
};

const homeSlice = createSlice({
  initialState,
  name: NAME,
  reducers: {
    setHomeSliceInit: (state) => {
      state.docs = [];
      state.meta = initialState.meta;
      state.page = 0;
      state.status = "idle";
      state.isLastPage = false;
      state.isEmpty = false;
    },
    setApiStatus: (state, { payload }: PayloadAction<StatusType>) => {
      state.status = payload;
    },
    setScrapStatus: (state, { payload }: PayloadAction<ScrapStatus>) => {
      state.scrapStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, { payload }) => {
        state.status = "success";
        /* API 응답으로 기사가 있으면 수행합니다 */
        if (payload.docs.length) {
          const { docs, meta } = payload;
          const { hits, offset } = meta;
          state.docs = state.docs.concat(
            convertArticles(docs, { isScrap: false })
          );
          state.meta = meta;
          state.page = Math.floor(offset / 10);
          state.isLastPage = isLast(offset, hits);
        } else {
          state.isLastPage = true;
          state.isEmpty = true;
        }
      })
      .addCase(fetchArticles.rejected, (state, { payload }) => {
        if (payload instanceof Error) state.error = createError(payload);
        state.status = "failed";
      })
      .addCase(setScrap.fulfilled, (state) => {
        state.scrapStatus = "idle";
      });
  },
});

export const { setHomeSliceInit, setApiStatus, setScrapStatus } =
  homeSlice.actions;
export default homeSlice;
