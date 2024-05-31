import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../Defs";

const initialState: { data: User } = {
  data: {
    email: "",
    finger: false,
    firstName: "",
    lastName: "",
    gender: null,
    interests: [],
    photo: "",
    preferences: [],
  },
};

export const currentUserSlice = createSlice({
  name: "newUser",
  initialState,
  reducers: {
    updateNewUser: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetNewUser: (state) => {
      state.data = initialState.data;
    },
  },
});

const { actions, reducer } = currentUserSlice;
export const { resetNewUser, updateNewUser } = actions;

export default reducer;
