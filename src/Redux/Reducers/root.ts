import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./currentUser";
import themeReducer from "./theme";
import currentlyOnScreenReducer from "./currentlyOnScreen";

const rootReducer = combineReducers({
  User: userReducer,
  theme: themeReducer,
  currentlyOnScreen: currentlyOnScreenReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
