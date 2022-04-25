import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import modalSlice from "./slices/modalSlice";
import scrollSlice from "./slices/scrollSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
// import scrapSlice from "./slices/scrapSlice";
// import localStorage from "redux-persist/lib/storage";

// auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["home", "scroll", "modal"],
};

// const screenPersistConfig = {
//   key: "root:screen",
//   storage: localStorage,
// };
// screen: persistReducer(screenPersistConfig, scrapSlice.reducer),

const reducers = combineReducers({
  home: homeSlice.reducer,
  modal: modalSlice.reducer,
  scroll: scrollSlice.reducer,
});

export default persistReducer(persistConfig, reducers);
