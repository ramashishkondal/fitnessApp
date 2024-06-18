import React, { useRef } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
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
    <View>
      <View style={{ alignSelf: "center" }}>{ICONS.FoodBowl(size)}</View>
      <View style={{ marginHorizontal: 24, marginVertical: 16 }}>
        <HeadingText text="Choose Food" textStyle={{ fontWeight: "500" }} />
        <DescriptionText text="Select your meal and your foods that you consume today" />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <MealSelector title="Snack" mealTime={mealsSelected.current.mealTime} />
        <MealSelector title="Lunch" mealTime={mealsSelected.current.mealTime} />
        <MealSelector
          title="Dinner"
          mealTime={mealsSelected.current.mealTime}
        />
        <MealSelector
          title="Breakfast"
          mealTime={mealsSelected.current.mealTime}
        />
      </View>
      <View style={{ maxHeight: 200 }}>
        <ScrollView style={{ maxHeight: 200 }}>
          <TouchableOpacity activeOpacity={0.99} onPress={() => {}}>
            {foodData.map((item) => (
              <FoodSelector
                foodItem={item}
                foodData={mealsSelected.current.foodData}
              />
            ))}
          </TouchableOpacity>
        </ScrollView>
        {/* <FlatList
          data={foodData}
          renderItem={({ item }) => (
            <FoodSelector
              foodItem={item}
              foodData={mealsSelected.current.foodData}
            />
          )}
        /> */}
      </View>
      <CustomButton
        title="Add"
        onPress={handleSubmit}
        parentStyle={{ alignSelf: "center" }}
      />
    </View>
  );
};

export default ChooseFood;
