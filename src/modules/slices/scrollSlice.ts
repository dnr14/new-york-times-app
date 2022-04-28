import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const NAME = "scroll";

const scrollSlice = createSlice({
  initialState: {
    screenY: 0,
  },
  name: NAME,
  reducers: {
    setYOffset: (state, { payload }: PayloadAction<number>) => {
      state.screenY = payload;
    },
  },
});

/* 스크롤을 TOP으로 올리는 상수입니다. */
export const SCROLL_TOP = -1;
export const { setYOffset } = scrollSlice.actions;
export default scrollSlice;
