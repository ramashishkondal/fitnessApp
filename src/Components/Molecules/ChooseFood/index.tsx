import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomButton, DescriptionText, HeadingText } from "../../Atoms";
import { ChooseFoodProps } from "./types";
import { ICONS } from "../../../Constants";
import MealSelector from "../MealSelector";
import FoodSelector from "../FoodSelector";
import {
  DailyMeals,
  Meal,
  updateAllMealData,
} from "../../../Redux/Reducers/dailyMeal";
import { useAppDispatch } from "../../../Redux/Store";
import { ScrollView } from "react-native-gesture-handler";

const size = {
  width: 50,
  height: 50,
};
const foodData: Array<Meal> = [
  {
    name: "Apple",
    carbs: 25,
    fat: 0.3,
    protein: 0.5,
    calories: 95,
    serving_size_g: 182,
  },
  {
    name: "Banana",
    carbs: 27,
    fat: 0.3,
    protein: 1.3,
    calories: 105,
    serving_size_g: 118,
  },
  {
    name: "Chicken Breast",
    carbs: 0,
    fat: 3.6,
    protein: 31,
    calories: 165,
    serving_size_g: 100,
  },
  {
    name: "Broccoli",
    carbs: 6,
    fat: 0.3,
    protein: 2.6,
    calories: 55,
    serving_size_g: 91,
  },
  {
    name: "Almonds",
    carbs: 6,
    fat: 14,
    protein: 6,
    calories: 164,
    serving_size_g: 28,
  },
  {
    name: "Salmon",
    carbs: 0,
    fat: 13,
    protein: 20,
    calories: 208,
    serving_size_g: 100,
  },
  {
    name: "Oatmeal",
    carbs: 27,
    fat: 3,
    protein: 5,
    calories: 154,
    serving_size_g: 40,
  },
  {
    name: "Egg",
    carbs: 1.1,
    fat: 5,
    protein: 6,
    calories: 78,
    serving_size_g: 50,
  },
  {
    name: "Greek Yogurt",
    carbs: 4,
    fat: 0.4,
    protein: 10,
    calories: 59,
    serving_size_g: 170,
  },
  {
    name: "Avocado",
    carbs: 12,
    fat: 15,
    protein: 2,
    calories: 160,
    serving_size_g: 150,
  },
  {
    name: "Sweet Potato",
    carbs: 27,
    fat: 0.1,
    protein: 2,
    calories: 112,
    serving_size_g: 130,
  },
  {
    name: "Brown Rice",
    carbs: 45,
    fat: 1.5,
    protein: 5,
    calories: 216,
    serving_size_g: 195,
  },
  {
    name: "Quinoa",
    carbs: 39,
    fat: 3.5,
    protein: 8,
    calories: 222,
    serving_size_g: 185,
  },
  {
    name: "Whole Wheat Bread",
    carbs: 12,
    fat: 1,
    protein: 3,
    calories: 69,
    serving_size_g: 28,
  },
  {
    name: "Black Beans",
    carbs: 40,
    fat: 0.9,
    protein: 14,
    calories: 227,
    serving_size_g: 172,
  },
  {
    name: "Lentils",
    carbs: 40,
    fat: 0.8,
    protein: 18,
    calories: 230,
    serving_size_g: 198,
  },
  {
    name: "Pasta",
    carbs: 31,
    fat: 1.3,
    protein: 6,
    calories: 157,
    serving_size_g: 100,
  },
  {
    name: "Corn",
    carbs: 19,
    fat: 1.5,
    protein: 3.2,
    calories: 86,
    serving_size_g: 100,
  },
  {
    name: "Potato",
    carbs: 17,
    fat: 0.1,
    protein: 2,
    calories: 77,
    serving_size_g: 100,
  },
  {
    name: "White Rice",
    carbs: 28,
    fat: 0.3,
    protein: 2.7,
    calories: 130,
    serving_size_g: 100,
  },
  {
    name: "Barley",
    carbs: 44,
    fat: 0.4,
    protein: 4.4,
    calories: 193,
    serving_size_g: 157,
  },
  {
    name: "Chickpeas",
    carbs: 27,
    fat: 2.6,
    protein: 14.5,
    calories: 164,
    serving_size_g: 100,
  },
  {
    name: "Peas",
    carbs: 14,
    fat: 0.4,
    protein: 5.4,
    calories: 81,
    serving_size_g: 100,
  },
  {
    name: "Butternut Squash",
    carbs: 12,
    fat: 0.1,
    protein: 1,
    calories: 45,
    serving_size_g: 100,
  },
  {
    name: "Pumpkin",
    carbs: 7,
    fat: 0.1,
    protein: 1,
    calories: 26,
    serving_size_g: 100,
  },
  {
    name: "Dates",
    carbs: 75,
    fat: 0.2,
    protein: 2,
    calories: 282,
    serving_size_g: 100,
  },
  {
    name: "Honey",
    carbs: 82,
    fat: 0,
    protein: 0.3,
    calories: 304,
    serving_size_g: 100,
  },
  {
    name: "Raisins",
    carbs: 79,
    fat: 0.5,
    protein: 3.1,
    calories: 299,
    serving_size_g: 100,
  },
  {
    name: "Mango",
    carbs: 15,
    fat: 0.4,
    protein: 0.8,
    calories: 60,
    serving_size_g: 100,
  },
  {
    name: "Carrots",
    carbs: 10,
    fat: 0.2,
    protein: 0.9,
    calories: 41,
    serving_size_g: 100,
  },
  {
    name: "Beets",
    carbs: 10,
    fat: 0.2,
    protein: 1.6,
    calories: 43,
    serving_size_g: 100,
  },
  {
    name: "Couscous",
    carbs: 23,
    fat: 0.2,
    protein: 3.8,
    calories: 112,
    serving_size_g: 100,
  },
  {
    name: "Kidney Beans",
    carbs: 22,
    fat: 0.5,
    protein: 8.7,
    calories: 127,
    serving_size_g: 100,
  },
];

export type MealsSelected = {
  mealTime: {
    snack: boolean;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  foodData: Array<Meal>;
};
const ChooseFood: React.FC<ChooseFoodProps> = ({ setModalFalse }) => {
  const dispatch = useAppDispatch();
  const mealsSelected = useRef<MealsSelected>({
    mealTime: {
      snack: false,
      breakfast: false,
      dinner: false,
      lunch: false,
    },
    foodData: [],
  });

  const handleSubmit = () => {
    let dtArray: DailyMeals = {
      breakfast: [],
      dinner: [],
      lunch: [],
      snack: [],
    };
    if (mealsSelected.current.mealTime.breakfast === true) {
      dtArray.breakfast = mealsSelected.current.foodData;
    }
    if (mealsSelected.current.mealTime.snack === true) {
      dtArray.snack = mealsSelected.current.foodData;
    }
    if (mealsSelected.current.mealTime.lunch === true) {
      dtArray.lunch = mealsSelected.current.foodData;
    }
    if (mealsSelected.current.mealTime.dinner === true) {
      dtArray.dinner = mealsSelected.current.foodData;
    }
    dispatch(updateAllMealData(dtArray));
    setModalFalse();
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity activeOpacity={1}>
          <View style={{ alignSelf: "center" }}>{ICONS.FoodBowl(size)}</View>
          <View style={{ marginHorizontal: 24, marginVertical: 16 }}>
            <HeadingText text="Choose Food" textStyle={{ fontWeight: "500" }} />
            <DescriptionText text="Select your meal and your foods that you consume today" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 40,
            }}
          >
            <MealSelector
              title="Snack"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Lunch"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Dinner"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Breakfast"
              mealTime={mealsSelected.current.mealTime}
            />
          </View>
          <View style={{ margin: 16, marginVertical: 32 }}>
            {foodData.map((item) => (
              <FoodSelector
                foodItem={item}
                foodData={mealsSelected.current.foodData}
              />
            ))}
          </View>
        </TouchableOpacity>
        <CustomButton
          title="Add"
          onPress={handleSubmit}
          parentStyle={{ alignSelf: "center", marginVertical: 16 }}
        />
      </ScrollView>
    </View>
  );
};

export default ChooseFood;
