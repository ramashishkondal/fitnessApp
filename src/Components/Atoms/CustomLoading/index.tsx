// libs
import React from "react";
import { ActivityIndicator } from "react-native";

// custom
import { CustomLoadingProps } from "./types";
import { COLORS } from "../../../Constants";

const CustomLoading: React.FC<CustomLoadingProps> = ({
  color = COLORS.SECONDARY.WHITE,
  style,
}) => {
  return <ActivityIndicator size={"small"} color={color} style={style} />;
};

export default CustomLoading;
