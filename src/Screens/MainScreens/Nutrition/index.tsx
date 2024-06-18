// libs
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

// 3rd party
import { PieChart } from "react-native-gifted-charts";

// custom
import {
  NutritionHeaderRight,
  WithModal,
  PieChartInfoItem,
  NutritionStats,
  DietDataFlatList,
  ChooseFood,
} from "../../../Components";
import { COLORS, STRING } from "../../../Constants";
import { NutritionProps } from "../../../Defs/navigators";
import { styles } from "./styles";
import { useAppSelector } from "../../../Redux/Store";
import { getPercentage } from "../../../Utils/commonUtils";

const Nutrition: React.FC<NutritionProps> = ({ navigation }) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);

  // redux use
  const { nutrition: caloriesBurned } = useAppSelector(
    (state) => state.health.value
  );
  const { data: dailyMeals } = useAppSelector((state) => state.dailyMeals);
  const statsData = Object.values(dailyMeals)
    .flat()
    .reduce(
      (acc, val) => ({
        calories: ~~(val.calories + acc.calories),
        carbs: ~~(val.carbs + acc.carbs),
        fat: ~~(val.fat + acc.fat),
        protein: ~~(val.protein + acc.protein),
      }),
      {
        calories: 0,
        carbs: 0,
        fat: 0,
        protein: 0,
      }
    );
  const portienData = [
    {
      value: ~~getPercentage(statsData.protein, statsData.calories),
      color: COLORS.SECONDARY.ORANGE,
      text: "",
    },
    {
      value: 100 - ~~getPercentage(statsData.protein, statsData.calories),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];
  const carbsData = [
    {
      value: ~~getPercentage(statsData.carbs, statsData.calories),
      color: COLORS.PRIMARY.PURPLE,
      text: "",
    },
    {
      value: 100 - ~~getPercentage(statsData.carbs, statsData.calories),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];
  const fatData = [
    {
      value: ~~getPercentage(statsData.fat, statsData.calories),
      color: COLORS.SECONDARY.CYAN,
      text: "",
    },
    {
      value: 100 - ~~getPercentage(statsData.fat, statsData.calories),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];
  // effect use
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, []);

  // functions
  const handleOnPress = () => setModalVisible(true);
  const headerRight = () => (
    <NutritionHeaderRight handleOnPress={handleOnPress} />
  );

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
              data={fatData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <PieChart
              donut
              showText
              radius={60}
              innerRadius={45}
              data={carbsData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={{ position: "absolute" }}>
            <PieChart
              donut
              showText
              radius={40}
              innerRadius={25}
              data={portienData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
              edgesRadius={120}
            />
          </View>
        </View>
        <View>
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.PROTEIN}
            percentage={portienData[0].value}
            color={COLORS.SECONDARY.CYAN}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.CARB}
            percentage={carbsData[0].value}
            color={COLORS.PRIMARY.PURPLE}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.FAT}
            percentage={fatData[0].value}
            color={COLORS.SECONDARY.ORANGE}
          />
        </View>
      </View>
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.PROTEIN,
          percentage: portienData[0].value,
          quantity: statsData.protein,
          color: COLORS.SECONDARY.CYAN,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.CARB,
          percentage: carbsData[0].value,
          quantity: statsData.carbs,
          color: COLORS.PRIMARY.PURPLE,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.FAT,
          percentage: fatData[0].value,
          quantity: statsData.fat,
          color: COLORS.SECONDARY.ORANGE,
        }}
      />
      <WithModal
        modalVisible={modalVisible}
        setModalFalse={() => setModalVisible(false)}
      >
        <ChooseFood setModalFalse={() => setModalVisible(false)} />
      </WithModal>
      <DietDataFlatList />
    </ScrollView>
  );
};

export default Nutrition;
