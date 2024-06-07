import React from "react";
import { Text, View } from "react-native";
import { DataInfoCompareProps } from "./types";
import { styles } from "./styles";

const DataInfoCompare = ({
  totalGlasses,
  glassesDrank,
}: DataInfoCompareProps) => {
  return (
    <View style={styles.parent}>
      <View style={styles.leftCtr}>
        <Text style={styles.mainInfoText}>{glassesDrank * 250} ml</Text>
        <Text style={styles.descriptionText}>Water Drank</Text>
      </View>
      <View style={styles.rightCtr}>
        <Text style={styles.mainInfoText}>{totalGlasses} glasses</Text>
        <Text style={styles.descriptionText}>Daily Goal</Text>
      </View>
    </View>
  );
};

export default DataInfoCompare;
