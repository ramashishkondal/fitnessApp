import React from "react";
import { ActivityIndicator } from "react-native";

import { CustomLoadingProps } from "./types";
import { COLORS } from "../../Constants";

const CustomLoading = ({
  color = COLORS.SECONDARY.WHITE,
}: CustomLoadingProps) => {
  return <ActivityIndicator size={"small"} color={color} />;
};

export default CustomLoading;
