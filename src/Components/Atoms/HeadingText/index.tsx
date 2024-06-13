// libs
import React from "react";
import { Text } from "react-native";

// custom
import { HeadingTextProps } from "./types";
import { styles } from "./styles";

const HeadingText = ({
  text,
  textStyle,
  headingTextStyle = 1,
}: HeadingTextProps) => {
  if (headingTextStyle === 2) {
    return <Text style={[styles.text2, textStyle]}>{text}</Text>;
  }
  return <Text style={[styles.text1, textStyle]}>{text}</Text>;
};

export default HeadingText;
