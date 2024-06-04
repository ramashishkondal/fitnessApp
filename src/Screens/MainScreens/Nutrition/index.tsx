// libs
import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// custom
import { styles } from "./styles";
import { COLORS } from "../../../Constants";

const Nutrition = () => {
  const pieData3 = [
    { value: 63, color: "#F7A56D", text: "" },
    { value: 37, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData2 = [
    { value: 30, color: "#7265E3", text: "" },
    { value: 70, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData1 = [
    { value: 27, color: "#44C7BC", text: "" },
    { value: 73, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>You burned 300 calories today</Text>
      <View style={styles.pieChart}>
        <View style={{ position: "relative", top: 80 }}>
          <PieChart
            donut
            showText
            radius={80}
            innerRadius={65}
            data={pieData1}
            innerCircleColor={COLORS.PRIMARY.DARK_GREY}
          />
        </View>
        <View style={{ position: "absolute", top: 100 }}>
          <PieChart
            donut
            showText
            radius={60}
            innerRadius={45}
            data={pieData2}
            innerCircleColor={COLORS.PRIMARY.DARK_GREY}
          />
        </View>
        <View style={{ position: "absolute", top: 120 }}>
          <PieChart
            donut
            showText
            radius={40}
            innerRadius={25}
            data={pieData3}
            innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            edgesRadius={120}
          />
        </View>
      </View>
      <View style={styles.statisticsCtr}></View>
      <View style={styles.foodCtr}></View>
    </View>
  );
};

export default Nutrition;
