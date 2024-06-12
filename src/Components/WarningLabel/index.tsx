import React from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import { styles } from "./styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const WarningLabel = ({
  parentStyle,
}: {
  parentStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <Animated.View
      style={[styles.parent, parentStyle]}
      entering={FadeIn}
      exiting={FadeOut.duration(1000)}
    >
      <Text style={styles.warningText}>
        You didnt drink enough water for today
      </Text>
    </Animated.View>
  );
};

export default WarningLabel;
