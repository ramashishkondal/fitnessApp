import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Defs";

const initialState: { data: User & { password: string } } = {
  data: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    finger: null,
    gender: null,
    interests: null,
    photo: null,
    preferences: null,
    password: "",
  },
};

export const currentUserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateUserData: (
      state,
      action: PayloadAction<Partial<User & { password: string }>>
    ) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetUserData: (state) => {
      state.data = initialState.data;
    },
  },
});

const { actions, reducer } = currentUserSlice;
export const { updateUserData, resetUserData } = actions;

export default reducer;
