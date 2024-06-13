// libs
import React from "react";
import { Text } from "react-native";

// custom
import { DescriptionTextProps } from "./types";
import { styles } from "./styles";

const DescriptionText: React.FC<DescriptionTextProps> = ({
  text,
  textStyle,
}) => {
  return <Text style={[styles.text, textStyle]}>{text}</Text>;
};

export default DescriptionText;
