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

export const SCROLL_TOP = -1;
export const { setYOffset } = scrollSlice.actions;
export default scrollSlice;
