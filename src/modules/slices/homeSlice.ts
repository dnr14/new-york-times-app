import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

const API_KEY = process.env.REACT_APP_NEW_YORK_TIMES_KEY;
const NAME = "home";

/**
 * 전체 날짜없을 때 호출하는 썽크입니다.
 * 에러 처리해야됩니다.
 */
const makeEndPoint = (page: number, beginDate: string | null) => {
  let url = `/articlesearch.json?${API_KEY}&page=${page}&sort=oldest`;
  if (beginDate) url += `&begin_date=${beginDate.replace(/\./gi, "")}`;
  return `${url}`;
};

export const payloadCreator: PayloadCreatorFunc = (page, beginDate = null) => ({
  page,
  beginDate,
});

export const fetchArticles = createAsyncThunk<HomeSliceInit, ThunkProps>(
  `${NAME}/GET/ARTICLES`,
  async ({ page, beginDate }, { rejectWithValue }) => {
    try {
      const response = await http.get<HomeSliceInit>(
        makeEndPoint(page, beginDate)
      );
      return response;
    } catch (e) {
      return rejectWithValue("실패했습니다.");
    }
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
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.docs = [...state.docs, ...action.payload.docs];
        state.meta = action.payload.meta;
        state.page = Math.floor(action.payload.meta.offset / 10);
        state.status = "success";
      })
      .addCase(fetchArticles.rejected, (state, { payload }) => {});
  },
});

export const { setHomeSliceInit } = homeSlice.actions;
export default homeSlice;
