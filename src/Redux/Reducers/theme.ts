import { createSlice } from "@reduxjs/toolkit";
import { THEME } from "../../Constants/Enum";

const initialState: { value: THEME } = { value: THEME.LIGHT };
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changedToDark: (state) => {
      state.value = THEME.DARK;
    },
    changedToLight: (state) => {
      state.value = THEME.LIGHT;
    },
  },
});

const { actions, reducer } = themeSlice;
export const { changedToDark, changedToLight } = actions;

export default reducer;
