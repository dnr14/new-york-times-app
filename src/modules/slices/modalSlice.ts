import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const NAME = "modal";

/**
 * 필터링 된 데이터를 스토어에 넣고 마무리는 모달을 닫는다.
 * 여기서 types같은 값으로 바꾸자.
 */
export const setFilter = createAsyncThunk<boolean, ModalFilter>(
  `${NAME}/SET_FILTER`,
  (filter, { dispatch }) => {
    dispatch(saveFilterData(filter));
    return false;
  }
);

const initialState: ModalSliceInit = {
  isOpen: false,
  status: "close",
  filter: {
    headlineKeyword: null,
    selectedDate: null,
    selectedCountrys: null,
  },
};

const modalSlice = createSlice({
  initialState,
  name: NAME,
  reducers: {
    openCloseModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
      if (payload) state.status = "open";
      else state.status = "close";
    },
    saveFilterData: (state, { payload }: PayloadAction<ModalFilter>) => {
      const { headlineKeyword, selectedCountrys, selectedDate } = payload;
      state.filter.headlineKeyword = headlineKeyword;
      state.filter.selectedDate = selectedDate;
      state.filter.selectedCountrys = selectedCountrys;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFilter.fulfilled, (state, { payload }) => {
      state.isOpen = payload;
      state.status = "close";
    });
  },
});
export const { openCloseModal, saveFilterData } = modalSlice.actions;
export default modalSlice;
