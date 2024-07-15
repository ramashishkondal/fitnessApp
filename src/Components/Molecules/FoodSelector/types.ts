import {Meal} from '../../../Redux/Reducers/dailyMeal';

export type FoodSelectorProps = {
  foodItem: Omit<Meal, 'id'> & {isSelected: boolean};
  foodData: Array<Meal>;
  setFoodData: React.Dispatch<
    React.SetStateAction<
      {
        isSelected: boolean;
        name: string;
        carbs: number;
        fat: number;
        protein: number;
        calories: number;
        serving_size_g: number;
      }[]
    >
  >;
};
