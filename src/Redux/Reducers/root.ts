import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser";
import themeReducer from "./theme";
import newUserReducer from "./newUser";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  theme: themeReducer,
  newUser: newUserReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
