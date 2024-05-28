import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser";
import themeReducer from "./theme";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  theme: themeReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
