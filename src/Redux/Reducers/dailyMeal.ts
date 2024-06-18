import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Meal = {
  name: string;
  carbs: number;
  fat: number;
  protein: number;
  calories: number;
  serving_size_g: number;
};
export type DailyMeals = {
  snack: Array<Meal>;
  breakfast: Array<Meal>;
  lunch: Array<Meal>;
  dinner: Array<Meal>;
};
export type Meals = {
  snack: Meal;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
};

const initialState: { data: DailyMeals } = {
  data: {
    snack: [],
    breakfast: [],
    lunch: [],
    dinner: [],
  },
};

export const currentUserSlice = createSlice({
  name: "dailyMeals",
  initialState,
  reducers: {
    updateAllMealData: (state, action: PayloadAction<DailyMeals>) => {
      state.data.snack.push(...action.payload.snack);
      state.data.breakfast.push(...action.payload.breakfast);
      state.data.lunch.push(...action.payload.lunch);
      state.data.dinner.push(...action.payload.dinner);
    },
    resetMealData: (state) => {
      state.data = initialState.data;
    },
    resetMealDataItems: (state, action: PayloadAction<Partial<DailyMeals>>) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

const { actions, reducer } = currentUserSlice;
export const { resetMealData, updateAllMealData, resetMealDataItems } = actions;

export default reducer;
