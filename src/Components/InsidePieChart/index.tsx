import React from "react";
import { View, Text } from "react-native";
import { ICONS } from "../../Constants";
import { styles } from "./styles";

const manWalkingSize = { width: 45, height: 45 };
const InsidePieChart = ({ percentage }: { percentage: number }) => {
  return (
    <View style={styles.parent}>
      {ICONS.ManWalking(manWalkingSize)}
      <Text style={styles.text}>{percentage}%</Text>
      <Text style={styles.dailyGoalText}>of daily goal</Text>
    </View>
  );
};

export default InsidePieChart;
