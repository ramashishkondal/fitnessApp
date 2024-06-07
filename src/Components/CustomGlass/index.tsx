// libs
import React from "react";
import { TouchableOpacity, View } from "react-native";

// custom
import { ICONS } from "../../Constants";
import { styles } from "./styles";
import { CustomGlassProps } from "./types";

const size = {
  width: 40,
  height: 40,
};
const plusSize = {
  width: 15,
  height: 15,
};
const CustomGlass = ({
  isFilled,
  handleOnPress,
  handleDelete,
}: CustomGlassProps) => {
  return (
    <View style={styles.parent}>
      {isFilled ? (
        <TouchableOpacity onPress={handleDelete}>
          {ICONS.GlassWater(size)}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleOnPress}>
          {ICONS.GlassWaterEmpty(size)}
          <View style={styles.plusCtr}>{ICONS.Plus(plusSize)}</View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomGlass;
