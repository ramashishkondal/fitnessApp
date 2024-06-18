import React, { useState } from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "../../../Constants";
import { MealSelectorProps } from "./types";

const MealSelector: React.FC<MealSelectorProps> = ({ title, mealTime }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnPress = () => {
    switch (title) {
      case "Breakfast":
        mealTime.breakfast = !isChecked;
        break;
      case "Snack":
        mealTime.snack = !isChecked;
        break;
      case "Lunch":
        mealTime.lunch = !isChecked;
        break;
      case "Dinner":
        mealTime.dinner = !isChecked;
        break;
      default:
        console.log("edae");
    }
    setIsChecked(!isChecked);
  };
  return (
    <View style={{ alignItems: "center" }}>
      <BouncyCheckbox
        size={25}
        fillColor={COLORS.PRIMARY.PURPLE}
        unFillColor={COLORS.PRIMARY.GREY}
        innerIconStyle={{ borderColor: COLORS.PRIMARY.GREY }}
        onPress={handleOnPress}
        isChecked={isChecked}
        disableText
      />
      <Text>{title}</Text>
    </View>
  );
};

export default MealSelector;
