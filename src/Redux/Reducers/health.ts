import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {HealthData} from '../../Defs';

export type InitialState = {
  value: HealthData & {glassesLength: number};
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
      totalCalorie: 2500,
      noOfGlasses: 6,
      totalSteps: 500,
    },
    currentDate: new Date().toISOString(),
    glassesLength: 6,
  },
  goalAchieved: {
    modalShown: false,
  },
};

export const healthSlice = createSlice({
  name: 'healthSlice',
  initialState,
  reducers: {
    updateHealthData: (
      state,
      action: PayloadAction<Partial<InitialState['value']>>,
    ) => {
      state.value = {
        ...state.value,
        currentDate: new Date().toISOString(),
        ...action.payload,
      };
    },
    resetHealthData: state => {
      state.value = {
        ...state.value,
        ...{
          nutrition: 0,
          todaysSteps: 0,
          waterIntake: 0,
          currentDate: new Date().toISOString(),
        },
      };
      state.goalAchieved.modalShown = false;
    },
    setModalShown: (state, action: PayloadAction<boolean>) => {
      state.goalAchieved.modalShown = action.payload;
    },
  },
});

const {reducer, actions} = healthSlice;
export const {updateHealthData, resetHealthData, setModalShown} = actions;

export default reducer;
