import { combineReducers } from "@reduxjs/toolkit";
import currentUserReducer from "./currentUser";

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
