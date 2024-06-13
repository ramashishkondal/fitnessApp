// libs
import React from "react";
import { Text, View } from "react-native";

// custom
import { styles } from "./styles";
import { PerformanceCardProps } from "./types";

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  icon,
  performanceText,
  onDay,
  value,
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
