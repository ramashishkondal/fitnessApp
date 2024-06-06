import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    nutrition: number;
    todaysSteps: number;
    waterIntake: number;
    hasPermission: boolean;
    goal: {
      totalCalorie: number;
      noOfGlasses: number;
      totalSteps: number;
    };
  };
};
const initialState: InitialState = {
  value: {
    nutrition: 0,
    todaysSteps: 0,
    waterIntake: 0,
    hasPermission: false,
    goal: {
      totalCalorie: 1000,
      noOfGlasses: 6,
      totalSteps: 10000,
    },
  },
};

export const healthSlice = createSlice({
  name: "healthSlice",
  initialState,
  reducers: {
    updateHealthData: (
      state,
      action: PayloadAction<Partial<InitialState["value"]>>
    ) => {
      state.value = { ...state.value, ...action.payload };
    },
  },
});

const { reducer, actions } = healthSlice;
export const { updateHealthData } = actions;

export default reducer;
