import React from "react";
import { Text, View } from "react-native";
import { SIZES } from "../../../Constants";

type NutritionStatsProps = {
  item: {
    title: string;
    quantity: string | number;
    percentage: string | number;
    color: string;
  };
};
const NutritionStats = ({
  item: { percentage, quantity, title, color },
}: NutritionStatsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: color,
            width: 18,
            height: 18,
            borderRadius: SIZES.rounding0,
          }}
        />
        <Text
          style={{
            paddingHorizontal: 8,
            fontSize: SIZES.font13,
            minWidth: 120,
          }}
        >
          {title}
        </Text>
      </View>
      <Text
        style={{ fontSize: SIZES.font13, minWidth: 50, textAlign: "right" }}
      >
        {quantity}g
      </Text>
      <Text
        style={{
          fontSize: SIZES.font13,
          minWidth: 50,
          textAlign: "right",
          fontWeight: SIZES.fontBold0,
        }}
      >
        {percentage}%
      </Text>
    </View>
  );
};

export default NutritionStats;
