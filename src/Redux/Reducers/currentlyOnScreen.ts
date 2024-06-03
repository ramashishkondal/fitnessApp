import { createSlice } from "@reduxjs/toolkit";
import { onboardingStackParamList } from "../../Defs";

const initialState: { onScreen: { name: keyof onboardingStackParamList } } = {
  onScreen: {
    name: "LandingPage",
  },
};

export const currentScreenSlice = createSlice({
  name: "currentlyOnScreen",
  initialState,
  reducers: {
    updateScreen: (state, action) => {
      if (!state.onScreen) {
        state.onScreen = { name: "LandingPage" }; 
      }
      state.onScreen.name = action.payload;
    },
    resetOnScreen: (state) => {
      state.onScreen.name = "LandingPage";
    },
  },
});

const { actions, reducer } = currentScreenSlice;
export const { updateScreen, resetOnScreen } = actions;

export default reducer;
