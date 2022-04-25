import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const NAME = "scrap";

const scrapSlice = createSlice({
  initialState: {
    TEST: [1, 2, 3, 4, 5],
  },
  name: NAME,
  reducers: {
    add: (state, action: PayloadAction<number[]>) => {
      state.TEST = [...state.TEST, ...action.payload];
    },
  },
});
export const { add } = scrapSlice.actions;
export default scrapSlice;
