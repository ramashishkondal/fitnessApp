import React from "react";
import { Text, View } from "react-native";

const PieChartInfoItem = ({
  item,
  percentage,
  color,
}: {
  item: string;
  percentage: string | number;
  color: string;
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 15,
        alignItems: "center",
      }}
    >
      <View
        style={{
          borderRadius: 100,
          backgroundColor: color,
          width: 15,
          height: 15,
        }}
      />
      <Text style={{ paddingHorizontal: 5 }}>
        {item} {percentage}%
      </Text>
    </View>
  );
};

export default PieChartInfoItem;
