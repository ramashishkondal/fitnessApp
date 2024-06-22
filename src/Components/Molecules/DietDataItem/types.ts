import {DailyMeals, Meal} from '../../../Redux/Reducers/dailyMeal';
import {DummyData} from '../DietDataList/types';

export type DietDataItemProps = {
  item: Array<Meal>;
  timeOfMeal: string;
};
