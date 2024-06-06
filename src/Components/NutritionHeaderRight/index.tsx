import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ICONS } from "../../Constants";
import { styles } from "./styles";
import { NutritionHeaderRightProps } from "./types";

const NutritionHeaderRight = ({ handleOnPress }: NutritionHeaderRightProps) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.iconCtr} onPress={handleOnPress}>
        {ICONS.PLUS_CIRCLE({ width: 25, height: 25 })}
      </TouchableOpacity>
    </View>
  );
};

export default NutritionHeaderRight;
