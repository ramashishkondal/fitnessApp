import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";

const PerformanceCard = ({
  icon,
  performanceText,
  onDay,
  value,
}: {
  icon: React.ReactNode;
  performanceText: string;
  onDay: string;
  value: string | number;
}) => {
  return (
    <View style={styles.parent}>
      <View style={styles.performanceCtr}>
        <View style={styles.iconCtr}>{icon}</View>
        <View style={styles.titleAndDescContainer}>
          <Text style={styles.descTitleText}>{performanceText}</Text>
          <Text style={styles.descText}>{onDay}</Text>
        </View>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

export default PerformanceCard;
