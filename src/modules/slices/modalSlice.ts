import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalSliceInit = {
  isOpen: false,
  headlineKeyword: "",
  searchDate: "",
  searchCountry: [],
};

const modalSlice = createSlice({
  initialState,
  name: "modal",
  reducers: {
    modalOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
    modalClose: (state, action: PayloadAction<false>) => {
      state.isOpen = action.payload;
    },
  },
});
export const { modalOpen } = modalSlice.actions;
export default modalSlice;
