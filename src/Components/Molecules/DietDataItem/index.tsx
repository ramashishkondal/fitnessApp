// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { ICONS } from "../../../Constants";
import { DietDataItemProps } from "./types";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { resetMealDataItems } from "../../../Redux/Reducers/dailyMeal";

const DietDataItem = ({ item, timeOfMeal }: DietDataItemProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    switch (timeOfMeal) {
      case "Breakfast":
        dispatch(resetMealDataItems({ breakfast: [] }));
        break;
      case "Snack":
        dispatch(resetMealDataItems({ snack: [] }));
        break;
      case "Lunch":
        dispatch(resetMealDataItems({ lunch: [] }));
        break;
      case "Dinner":
        dispatch(resetMealDataItems({ dinner: [] }));
        break;
    }
  };
  if (item.length === 0) {
    return null;
  }
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{timeOfMeal}</Text>
      {item.map((val, index, arr) => {
        return (
          <View
            style={[
              styles.childCtr,
              index !== 0 && index !== arr.length
                ? { borderTopWidth: 1.5 }
                : null,
            ]}
            key={index}
          >
            <View style={styles.titleCtr}>
              <Text style={styles.productTitleText}>{val.name}</Text>
              <Text style={styles.quantityText}>
                {val.serving_size_g} grams
              </Text>
            </View>
            <View>
              <Text style={styles.caloriesText}>{val.calories}</Text>
            </View>
          </View>
        );
      })}
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={handleClose}
      >
        <View>{ICONS.Close({ width: 35, height: 35 })}</View>
      </TouchableOpacity>
    </View>
  );
};

export default DietDataItem;
