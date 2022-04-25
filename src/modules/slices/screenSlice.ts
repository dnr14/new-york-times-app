import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const screenSlice = createSlice({
  initialState: {
    adddddddddd: [1, 2, 3, 4, 5],
  },
  name: "screen",
  reducers: {
    add: (state, action: PayloadAction<number[]>) => {
      state.adddddddddd = [...state.adddddddddd, ...action.payload];
    },
  },
});
export const { add } = screenSlice.actions;
export default screenSlice;
