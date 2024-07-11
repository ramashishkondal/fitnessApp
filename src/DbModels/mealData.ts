import Realm, {ObjectSchema} from 'realm';
import {Meal} from '../Redux/Reducers/dailyMeal';

export class MealDb extends Realm.Object {
  breakfast!: Array<Meal>;
  dinner!: Array<Meal>;
  snack!: Array<Meal>;
  lunch!: Array<Meal>;
  uid!: string;

  public static readonly schema: ObjectSchema = {
    name: 'MealData',
    properties: {
      uid: {
        type: 'string',
      },
      breakfast: 'FoodDb[]',
      dinner: 'FoodDb[]',
      snack: 'FoodDb[]',
      lunch: 'FoodDb[]',
    },
    primaryKey: 'uid',
  };
}

export class FoodDb extends Realm.Object {
  name!: string;
  carbs!: number;
  fat!: number;
  protein!: number;
  calories!: number;
  serving_size_g!: number;
  id!: string;

  public static readonly schema: ObjectSchema = {
    name: 'FoodDb',
    properties: {
      name: {
        type: 'string',
      },
      carbs: {
        type: 'float',
      },
      fat: {
        type: 'float',
      },
      protein: {
        type: 'float',
      },
      calories: {
        type: 'float',
      },
      serving_size_g: {
        type: 'float',
      },
      id: {
        type: 'string',
      },
    },
  };
}
