// libs
import React from "react";
import { View, Text } from "react-native";

// custom
import { ICONS } from "../../../Constants";
import { InsidePieChartProps } from "./types";
import { styles } from "./styles";

const manWalkingSize = { width: 45, height: 45 };
const InsidePieChart: React.FC<InsidePieChartProps> = ({ percentage }) => {
  return (
    <View style={styles.parent}>
      {ICONS.ManWalking(manWalkingSize)}
      <Text style={styles.text}>{percentage}%</Text>
      <Text style={styles.dailyGoalText}>of daily goal</Text>
    </View>
  );
};

export default InsidePieChart;
