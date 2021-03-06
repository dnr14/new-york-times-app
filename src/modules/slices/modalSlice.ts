import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const NAME = "modal";

/**
 * 필터링 된 데이터를 스토어에 넣고 마무리는 모달을 닫는다.
 * 여기서 types같은 값으로 바꾸자.
 */

export const createSetFilterPayload: CreateSetFilterPayload = (
  filter,
  type
) => ({
  ...filter,
  type,
});

export const setFilter = createAsyncThunk<boolean, SetFilterThunkPayload>(
  `${NAME}/SET_FILTER`,
  (filter, { dispatch }) => {
    dispatch(saveFilterData(filter));
    return false;
  }
);

const initialState: ModalSliceInit = {
  isOpen: false,
  status: "close",
  type: "home",
  filter: {
    home: {
      headlineKeyword: null,
      selectedDate: null,
      selectedCountrys: null,
      selectedCountrysHash: null,
    },
    scrap: {
      headlineKeyword: null,
      selectedDate: null,
      selectedCountrys: null,
      selectedCountrysHash: null,
    },
  },
};

const modalSlice = createSlice({
  initialState,
  name: NAME,
  reducers: {
    openCloseModal: (state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = payload;
      state.status = payload ? "open" : "close";
    },
    setModalType: (state, { payload }: PayloadAction<ModalFilterType>) => {
      state.type = payload;
    },
    saveFilterData: (
      state,
      { payload }: PayloadAction<SetFilterThunkPayload>
    ) => {
      const {
        headlineKeyword,
        selectedCountrys,
        selectedDate,
        type,
        selectedCountrysHash,
      } = payload;
      state.filter[type].headlineKeyword = headlineKeyword;
      state.filter[type].selectedDate = selectedDate;
      state.filter[type].selectedCountrys = selectedCountrys;
      state.filter[type].selectedCountrysHash = selectedCountrysHash;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setFilter.fulfilled, (state, { payload }) => {
      state.isOpen = payload;
      state.status = "close";
    });
  },
});
export const { openCloseModal, saveFilterData, setModalType } =
  modalSlice.actions;
export default modalSlice;
