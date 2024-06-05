import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./currentUser";
import themeReducer from "./theme";
import currentlyOnScreenReducer from "./currentlyOnScreen";
import healthReducer from "./health";

const rootReducer = combineReducers({
  User: userReducer,
  theme: themeReducer,
  currentlyOnScreen: currentlyOnScreenReducer,
  health: healthReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
