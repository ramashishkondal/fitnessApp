// libs
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";

// custom
import {
  NutritionHeaderRight,
  WithModal,
  PieChartInfoItem,
  NutritionStats,
  DietDataFlatList,
} from "../../../Components";
import { COLORS, STRING } from "../../../Constants";
import { NutritionProps } from "../../../Defs/navigators";
import { styles } from "./styles";
import { useAppSelector } from "../../../Redux/Store";

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
const Nutrition = ({ navigation }: NutritionProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { nutrition: caloriesBurned } = useAppSelector(
    (state) => state.health.value
  );
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
        {STRING.NUTRITION.TITLE[1]}{" "}
        <Text style={styles.calorieText}>{caloriesBurned}</Text>{" "}
        {STRING.NUTRITION.TITLE[2]}
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
            item={STRING.NUTRITION.NUTRITION_STATS.PROTEIN}
            percentage="63"
            color={COLORS.SECONDARY.CYAN}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.CARB}
            percentage="30"
            color={COLORS.PRIMARY.PURPLE}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.FAT}
            percentage="27"
            color={COLORS.SECONDARY.ORANGE}
          />
        </View>
      </View>
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.PROTEIN,
          percentage: 63,
          quantity: 100,
          color: COLORS.SECONDARY.CYAN,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.CARB,
          percentage: 30,
          quantity: 60,
          color: COLORS.PRIMARY.PURPLE,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.FAT,
          percentage: 27,
          quantity: 20,
          color: COLORS.SECONDARY.ORANGE,
        }}
      />
      <WithModal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Text>1231s</Text>
      </WithModal>
      <DietDataFlatList />
    </ScrollView>
  );
};

export default Nutrition;
