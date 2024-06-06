import React from "react";
import { Text, View } from "react-native";
import { WaterDrankInfoProps } from "./types";
import { styles } from "./styles";

const WaterDrankInfo = ({
  totalGlasses,
  glassesDrank,
}: WaterDrankInfoProps) => {
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

export default WaterDrankInfo;
