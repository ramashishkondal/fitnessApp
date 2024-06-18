import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../Defs";

const initialState: { data: User & { password: string | null } } = {
  data: {
    id: null,
    firstName: "John",
    lastName: "Doe",
    email: "johnDoe@gmail.com",
    finger: false,
    gender: "male",
    interests: [],
    photo: "",
    preferences: [],
    password: null,
    healthData: [],
    notifications: [],
  },
};

export const currentUserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    updateUserData: (
      state,
      action: PayloadAction<Partial<User & { password: string | null }>>
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
