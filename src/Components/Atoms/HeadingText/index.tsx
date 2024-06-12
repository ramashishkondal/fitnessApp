import React from "react";
import { Text } from "react-native";
import { HeadingTextProps } from "./types";
import { styles } from "./styles";

const HeadingText = ({ text, textStyle }: HeadingTextProps) => {
  return <Text style={[styles.text, textStyle]}>{text}</Text>;
};

export default HeadingText;
