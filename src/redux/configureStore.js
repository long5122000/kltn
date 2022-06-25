import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import logger from "redux-logger";
import addMultiCartSlice from "./addMultiCartSlice";
const reducer = combineReducers({
  global: globalSlice,
  count: addMultiCartSlice,
});
const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger),
});
export default store;
