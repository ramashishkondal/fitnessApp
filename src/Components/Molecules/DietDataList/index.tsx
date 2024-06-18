// libs
import React from "react";
import { View } from "react-native";

// custom
import DietDataItem from "../DietDataItem";
import { DummyData } from "./types";
import { useAppSelector } from "../../../Redux/Store";

const dummyData: Array<DummyData> = [
  {
    title: "Breakfast",
    data: [
      { productTitle: "Eggs", caloriesConsumed: 300, initialQuantity: 200 },
      { productTitle: "Milk", caloriesConsumed: 100, initialQuantity: 200 },
    ],
  },
  {
    title: "Lunch",
    data: [
      { productTitle: "Chicken", caloriesConsumed: 200, initialQuantity: 150 },
      { productTitle: "Rice", caloriesConsumed: 200, initialQuantity: 150 },
      {
        productTitle: "Chicken Tikka",
        caloriesConsumed: 200,
        initialQuantity: 150,
      },
    ],
  },
  {
    title: "Dinner",
    data: [
      { productTitle: "Banana", caloriesConsumed: 100, initialQuantity: 80 },
      { productTitle: "Apple", caloriesConsumed: 100, initialQuantity: 80 },
      { productTitle: "Orange", caloriesConsumed: 100, initialQuantity: 80 },
    ],
  },
];

const DietDataList: React.FC = () => {
  const { data: dailyMeals } = useAppSelector((state) => state.dailyMeals);
  return (
    <View>
      <DietDataItem item={dailyMeals.breakfast} timeOfMeal="Breakfast" />
      <DietDataItem item={dailyMeals.snack} timeOfMeal="Snack" />
      <DietDataItem item={dailyMeals.lunch} timeOfMeal="Lunch" />
      <DietDataItem item={dailyMeals.dinner} timeOfMeal="Dinner" />
    </View>
  );
};

export default DietDataList;
