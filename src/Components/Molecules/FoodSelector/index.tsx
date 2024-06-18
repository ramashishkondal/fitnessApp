import React, { useState } from "react";
import { Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS } from "../../../Constants";
import { FoodSelectorProps } from "./types";
import { FONT_FAMILY, SIZES } from "../../../Constants/commonStyles";

const FoodSelector: React.FC<FoodSelectorProps> = ({ foodItem, foodData }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnPress = () => {
    if (!isChecked) {
      foodData.push(foodItem);
    } else {
      const index = foodData.findIndex((item) => item.name === foodItem.name);
      if (index !== -1) {
        foodData.splice(index, 1); // Remove the item at the found index
      }
    }
    setIsChecked(!isChecked);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 8,
        paddingTop: 20,
        borderBottomWidth: 1,
        borderColor: COLORS.SECONDARY.LIGHT_GREY,
      }}
    >
      <View style={{ flex: 1, marginLeft: 8 }}>
        <Text
          style={{ fontFamily: FONT_FAMILY.REGULAR, fontSize: SIZES.font12 }}
        >
          {foodItem.name}
        </Text>
      </View>
      <BouncyCheckbox
        size={25}
        fillColor={COLORS.PRIMARY.PURPLE}
        unFillColor={COLORS.PRIMARY.GREY}
        innerIconStyle={{ borderColor: COLORS.PRIMARY.GREY }}
        onPress={handleOnPress}
        isChecked={isChecked}
      />
    </View>
  );
};

export default FoodSelector;
