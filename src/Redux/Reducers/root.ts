import {combineReducers} from '@reduxjs/toolkit';
import userReducer from './currentUser';
import themeReducer from './theme';
import currentlyOnScreenReducer from './currentlyOnScreen';
import healthReducer from './health';
import dailyMealsReducer from './dailyMeal';
import settingsReducer from './userSettings';

const rootReducer = combineReducers({
  User: userReducer,
  theme: themeReducer,
  currentlyOnScreen: currentlyOnScreenReducer,
  health: healthReducer,
  dailyMeals: dailyMealsReducer,
  settings: settingsReducer,
});

export type RootReducer = typeof rootReducer;

export default rootReducer;
