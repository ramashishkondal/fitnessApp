// libs
import React from "react";
import { View, Text } from "react-native";

// custom
import { ICONS } from "../../../Constants";
import { InsidePieChartProps } from "./types";
import { styles } from "./styles";

const manWalkingSize = { width: 25, height: 25 };
const InsidePieChart: React.FC<InsidePieChartProps> = ({
  value,
  suffix,
  text,
}) => {
  return (
    <View style={styles.parent}>
      {ICONS.ManWalking(manWalkingSize)}
      <Text style={styles.text}>
        {value}
        {suffix}
      </Text>
      <Text style={styles.dailyGoalText}>{text}</Text>
    </View>
  );
};

export default InsidePieChart;
