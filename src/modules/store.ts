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

export default store;
