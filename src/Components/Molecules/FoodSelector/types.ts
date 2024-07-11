import {Meal} from '../../../Redux/Reducers/dailyMeal';

export type FoodSelectorProps = {
  foodItem: Omit<Meal, 'id'>;
  foodData: Array<Meal>;
};
