import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HealthData } from "../../Defs";
import { Timestamp } from "@react-native-firebase/firestore";

export type InitialState = {
  value: HealthData;
  goalAchieved: {
    modalShown: boolean;
  };
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
  goalAchieved: {
    modalShown: false,
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
      state.goalAchieved.modalShown = false;
    },
    setModalShown: (state, action: PayloadAction<boolean>) => {
      state.goalAchieved.modalShown = action.payload;
    },
  },
});

const { reducer, actions } = healthSlice;
export const { updateHealthData, resetHealthData, setModalShown } = actions;

export default reducer;
