import { combineReducers } from "@reduxjs/toolkit";
import trendingReducer from "./trending";
import questionReducer from "./question";

const rootReducer = combineReducers({
  trending: trendingReducer,
  question: questionReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
