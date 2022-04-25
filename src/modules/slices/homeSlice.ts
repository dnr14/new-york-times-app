import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../api/http";

const name = "home";

const initialState: HomeResponse = {
  docs: [],
  meta: {
    hits: 0,
    offset: 0,
    time: 8,
  },
  page: 0,
  status: "idle",
};

export const fetchNewYorkTimesArticle = createAsyncThunk(
  `${name}/fetchNewYorkTimesArticle`,
  async (offsetNumber: number, thunkAPI) => {
    try {
      const response = await http.get<HomeResponse>(
        `/articlesearch.json?${process.env.REACT_APP_NEW_YORK_TIMES_KEY}&begin_date=20220424&page=${offsetNumber}&sort=newest`
      );
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue("1");
    }
  }
);

const homeSlice = createSlice({
  initialState,
  name,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewYorkTimesArticle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewYorkTimesArticle.fulfilled, (state, action) => {
        state.docs = [...state.docs, ...action.payload.docs];
        state.meta = action.payload.meta;
        state.page = Math.floor(action.payload.meta.offset / 10);
        state.status = "success";
      })
      .addCase(fetchNewYorkTimesArticle.rejected, (state, action) => {});
  },
});

export default homeSlice;
