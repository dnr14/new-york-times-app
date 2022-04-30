import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import persistedReducer from "./reducers";
import thunk from "redux-thunk";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export interface ThunkApi {
  dispatch: AppDispatch;
  state: RootState;
}

export const useModalTypeSelector = (type: ModalFilterType) =>
  useTypedSelector(
    ({ modal }) => modal.filter[type],
    (befor, after) => {
      let isTrue = true;
      if (isTrue && befor.headlineKeyword !== after.headlineKeyword) {
        isTrue = false;
      }
      if (isTrue && befor.selectedDate !== after.selectedDate) {
        isTrue = false;
      }
      if (isTrue && befor.selectedCountrysHash !== after.selectedCountrysHash) {
        isTrue = false;
      }
      return isTrue;
    }
  );

export default store;
