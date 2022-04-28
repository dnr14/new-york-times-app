import { combineReducers } from "@reduxjs/toolkit";
import homeSlice from "./slices/homeSlice";
import modalSlice from "./slices/modalSlice";
import scrollSlice from "./slices/scrollSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import scrapSlice from "./slices/scrapSlice";
import localStorage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["home", "scroll", "modal"],
};

const scrapPersistConfig = {
  key: "root:scrap",
  storage: localStorage,
};

const reducers = combineReducers({
  home: homeSlice.reducer,
  modal: modalSlice.reducer,
  scroll: scrollSlice.reducer,
  scrap: persistReducer<ScrapSliceInit>(scrapPersistConfig, scrapSlice.reducer),
});

export default persistReducer(persistConfig, reducers);
