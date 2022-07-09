import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const NAME = "scrap";

export const getScrapArticles = createAsyncThunk(
  `${NAME}/GET_SCRAP_ARTICLES`,
  async (page: number, { dispatch }) => {
    dispatch(setPage(page));
    /* 무한 스크롤로 가져올는 걸 1초 딜레이 */
    await new Promise((res) => setTimeout(res, 1000));
  }
);

const initialState: ScrapSliceInit = {
  docs: [],
  page: 1,
  status: "idle",
};

const scrapSlice = createSlice({
  initialState: initialState,
  name: NAME,
  reducers: {
    addScrap: (state, { payload }: PayloadAction<Doc>) => {
      state.docs = state.docs
        .concat(payload)
        .sort((a, b) => (a.pub_date < b.pub_date ? 1 : -1));
    },
    deleteScrap: (state, { payload }: PayloadAction<string>) => {
      const newDocs = state.docs.filter((doc) => doc._id !== payload);
      state.docs = newDocs;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScrapArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getScrapArticles.fulfilled, (state) => {
        state.status = "success";
      });
  },
});
export const { addScrap, deleteScrap, setPage } = scrapSlice.actions;
export default scrapSlice;
