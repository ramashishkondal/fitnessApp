// libs
import React from "react";
import { Text, View } from "react-native";

// custom
import { styles } from "./styles";
import { PieChart } from "react-native-gifted-charts";
import { COLORS, ICONS } from "../../../Constants";
import { useAppSelector } from "../../../Redux/Store";

const DailySteps = () => {
  const {
    todaysSteps,
    goal: { totalSteps },
  } = useAppSelector((state) => state.health.value);
  const percentage = ~~((todaysSteps / totalSteps) * 100);
  const pieData = [
    { value: percentage, color: COLORS.PRIMARY.PURPLE },
    { value: 100 - percentage, color: "lightgray" },
  ];
  return (
    <View style={styles.parent}>
      <Text>awdawd awd afwaf wf</Text>
      <PieChart
        donut
        innerRadius={105}
        data={pieData}
        centerLabelComponent={() => {
          return (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {ICONS.ManWalking({ width: 50, height: 50 })}
              <Text
                style={{ fontSize: 30, textAlign: "center", marginTop: 10 }}
              >
                {percentage}%
              </Text>
              <Text style={{ fontSize: 24 }}>of daily goal</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default DailySteps;
