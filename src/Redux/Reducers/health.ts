import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    nutrition: number;
    todaysSteps: number;
    waterIntake: number;
    hasPermission: boolean;
  };
};
const initialState: InitialState = {
  value: {
    nutrition: 0,
    todaysSteps: 0,
    waterIntake: 0,
    hasPermission: false,
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
      console.log(state.value);
      state.value = { ...state.value, ...action.payload };
    },
  },
});

const { reducer, actions } = healthSlice;
export const { updateHealthData } = actions;

export default reducer;
