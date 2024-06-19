import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HealthData } from "../../Defs";
import { Timestamp } from "@react-native-firebase/firestore";

export type InitialState = {
  value: HealthData;
};

const initialState: InitialState = {
  value: {
    nutrition: 0,
    todaysSteps: 0,
    waterIntake: 0,
    hasPermission: false,
    goal: {
      totalCalorie: 8000,
      noOfGlasses: 6,
      totalSteps: 10000,
    },
    currentDate: Timestamp.fromDate(new Date()),
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
    resetHealthData: (state) => {
      state.value = {
        ...state.value,
        ...{
          nutrition: 0,
          todaysSteps: 0,
          waterIntake: 0,
          currentDate: Timestamp.fromDate(new Date()),
        },
      };
    },
  },
});

const { reducer, actions } = healthSlice;
export const { updateHealthData, resetHealthData } = actions;

export default reducer;
