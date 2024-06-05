// libs
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// custom
import {
  NutritionHeaderRight,
  AddFoodModal,
  PieChartInfoItem,
  NutritionStats,
} from "../../../Components";
import { COLORS } from "../../../Constants";
import { NutritionProps } from "../../../Defs/navigators";
import { styles } from "./styles";

const Nutrition = ({ navigation }: NutritionProps) => {
  const pieData3 = [
    { value: 63, color: COLORS.SECONDARY.ORANGE, text: "" },
    { value: 37, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData2 = [
    { value: 30, color: COLORS.PRIMARY.PURPLE, text: "" },
    { value: 70, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const pieData1 = [
    { value: 27, color: COLORS.SECONDARY.CYAN, text: "" },
    { value: 73, color: COLORS.PRIMARY.LIGHT_PURPLE },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const handleOnPress = () => setModalVisible(true);
  const headerRight = () => (
    <NutritionHeaderRight handleOnPress={handleOnPress} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);
  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.titleText}>
        You burned <Text style={styles.calorieText}>300</Text> calories today
      </Text>
      <View style={styles.childCtr}>
        <View style={styles.pieChart}>
          <View style={{ position: "relative" }}>
            <PieChart
              donut
              showText
              radius={80}
              innerRadius={65}
              data={pieData1}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <PieChart
              donut
              showText
              radius={60}
              innerRadius={45}
              data={pieData2}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
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
        <View>
          <PieChartInfoItem
            item="Protein"
            percentage="63"
            color={COLORS.SECONDARY.CYAN}
          />
          <PieChartInfoItem
            item="Carb"
            percentage="30"
            color={COLORS.PRIMARY.PURPLE}
          />
          <PieChartInfoItem
            item="Fat"
            percentage="27"
            color={COLORS.SECONDARY.ORANGE}
          />
        </View>
      </View>
      <NutritionStats
        item={{
          title: "Protein",
          percentage: 63,
          quantity: 100,
          color: COLORS.SECONDARY.CYAN,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: "Carb",
          percentage: 30,
          quantity: 60,
          color: COLORS.PRIMARY.PURPLE,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: "Fat",
          percentage: 27,
          quantity: 20,
          color: COLORS.SECONDARY.ORANGE,
        }}
      />
      <AddFoodModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
};

export default Nutrition;
