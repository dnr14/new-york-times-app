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

const createEndPoint = (
  page: number,
  beginDate: StringOrNull,
  headlineKeyword: StringOrNull
) => {
  let url = `${BASE_URL}&page=${page}&sort=oldest`;
  if (beginDate) url += `&begin_date=${beginDate.replace(/\./gi, "")}`;
  if (headlineKeyword) url += `&fq=headline:(${headlineKeyword})`;
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
  headlineKeyword = null
) => ({
  page,
  beginDate,
  headlineKeyword,
});

/**
 * 전체 날짜없을 때 호출하는 썽크입니다.
 */
export const fetchArticles = createAsyncThunk<
  HomeSliceInit,
  FetchArticlesThunkPayload
>(
  `${NAME}/GET/ARTICLES`,
  async ({ page, beginDate, headlineKeyword }, { rejectWithValue }) => {
    try {
      const response = await http.get<HomeSliceInit>(
        createEndPoint(page, beginDate, headlineKeyword)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const setScrap = createAsyncThunk<void, string, ThunkApi>(
  `${NAME}/SET_SCRAP`,
  (_id, { getState, dispatch }) => {
    const findDoc = (doc: Doc) => doc._id === _id;

    const { scrap, home } = getState();
    if (scrap.docs.some(findDoc)) {
      /* 스크랩에 값이 있다면 삭제합니다. */
      dispatch(deleteScrap(_id));
    } else {
      /* 스크랩에 값이 없다면 추가합니다. */
      // 기사는 분명히 있는데 프로그래밍 관점에서는 없다고 볼 수 있다. 생각해서 개선해보자.
      const doc = home.docs.find(findDoc);
      if (doc) {
        dispatch(addScrap({ ...doc, isScrap: true }));
      }
    }
    // homeDocs의 스크랩 유무는 scrapDocs에 유무에 따라 찍으면 된다.
    // dispatch(setIsScrap(_id));
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
    // 제거할지 생각해보자.
    setIsScrap: (state, { payload }: PayloadAction<string>) => {
      state.docs = state.docs.map((doc) =>
        doc._id === payload ? { ...doc, isScrap: !doc.isScrap } : doc
      );
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
      });
  },
});

export const { setHomeSliceInit, setApiStatus, setIsScrap } = homeSlice.actions;
export default homeSlice;
