import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import modalSlice from "./slices/modalSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
// import screenSlice from "./slices/screenSlice";
// import localStorage from "redux-persist/lib/storage";

/**
 *
 */
const persistConfig = {
  key: "root",
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["home"],
};

// const screenPersistConfig = {
//   key: "root:screen",
//   storage: localStorage,
// };
// screen: persistReducer(screenPersistConfig, screenSlice.reducer),

const reducers = combineReducers({
  home: homeSlice.reducer,
  modal: modalSlice.reducer,
});

export default persistReducer(persistConfig, reducers);
