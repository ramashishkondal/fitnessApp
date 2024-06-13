// libs
import React from "react";
import { View } from "react-native";

// custom
import DietDataItem from "../DietDataItem";
import { DummyData } from "./types";

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
  return (
    <View>
      {dummyData.map((val, index) => {
        return <DietDataItem item={val} key={index} />;
      })}
    </View>
  );
};

export default DietDataList;
