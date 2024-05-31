// libs
import React from "react";
import { View, Text } from "react-native";

// custom
import { styles } from "./styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type CustomErrorTextProps = {
  text: string;
};
const CustomErrorText = ({ text }: CustomErrorTextProps) => {
  return (
    <Animated.View style={styles.parent} entering={FadeIn} exiting={FadeOut}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

export default CustomErrorText;
