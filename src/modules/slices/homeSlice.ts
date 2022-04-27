import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

const API_KEY = process.env.REACT_APP_NEW_YORK_TIMES_KEY;
const NAME = "home";

/**
 * 전체 날짜없을 때 호출하는 썽크입니다.
 * 에러 처리해야됩니다.
 */
const createEndPoint = (page: number, beginDate: string | null) => {
  let url = `/articlesearch.json?${API_KEY}&page=${page}&sort=oldest`;
  if (beginDate) url += `&begin_date=${beginDate.replace(/\./gi, "")}`;
  return `${url}`;
};

export const createFetchArticlesPayload: CreateFetchArticlesPayloadFunc = (
  page,
  beginDate = null
) => ({
  page,
  beginDate,
});

export const fetchArticles = createAsyncThunk<
  HomeSliceInit,
  FetchArticlesThunkPayload
>(`${NAME}/GET/ARTICLES`, async ({ page, beginDate }, { rejectWithValue }) => {
  try {
    const response = await http.get<HomeSliceInit>(
      createEndPoint(page, beginDate)
    );
    return response;
  } catch (e) {
    return rejectWithValue("실패했습니다.");
  }
});

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, { payload }) => {
        const currentPage = Math.floor(payload.meta.offset / 10);
        const lastPage = Math.floor(payload.meta.hits / 10);

        state.docs = [...state.docs, ...payload.docs];
        state.meta = payload.meta;
        state.page = currentPage;
        state.status = "success";
        state.isLastPage = currentPage === lastPage;
      })
      .addCase(fetchArticles.rejected, (state, { payload }) => {
        state.status = "failed";
      });
  },
});

export const { setHomeSliceInit } = homeSlice.actions;
export default homeSlice;
