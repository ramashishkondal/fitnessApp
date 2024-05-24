import { createSlice } from "@reduxjs/toolkit";
import { User } from "matrix-js-sdk";

const initialState: { data: null | CurrentUser } = {
  data: null,
};

export interface CurrentUser {
  data: null | User;
}
export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.data = action.payload;
    },
    userLoggedOut: (state) => {
      state.data = null;
    },
  },
});

const { actions, reducer } = currentUserSlice;
export const { userLoggedIn, userLoggedOut } = actions;

export default reducer;
