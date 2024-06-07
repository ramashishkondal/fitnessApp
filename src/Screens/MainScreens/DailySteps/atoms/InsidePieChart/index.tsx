import React from "react";
import { View, Text } from "react-native";
import { ICONS, SIZES } from "../../../../../Constants";

const manWalkingSize = { width: 45, height: 45 };
const InsidePieChart = ({ percentage }: { percentage: number }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {ICONS.ManWalking(manWalkingSize)}
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 10,
          fontWeight: SIZES.fontBold0,
        }}
      >
        {percentage}%
      </Text>
      <Text style={{ fontSize: 16, fontWeight: SIZES.fontBold2 }}>
        of daily goal
      </Text>
    </View>
  );
};

export default InsidePieChart;
