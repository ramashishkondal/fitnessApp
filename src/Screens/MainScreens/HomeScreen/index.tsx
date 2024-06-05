// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { ICONS, STRING } from "../../../Constants";
import { styles } from "./styles";
import { CustomHomeDetailsCard } from "../../../Components";
import { HomeScreenProps } from "../../../Defs";
import { useAppSelector } from "../../../Redux/Store";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const goToNutrition = (): void => navigation.push("Nutrition");
  const goToWaterIntake = (): void => navigation.push("WaterIntake");
  const goToDailySteps = (): void => navigation.push("DailySteps");
  const { todaysSteps, waterIntake, nutrition } = useAppSelector(
    (state) => state.health.value
  );

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.HOME_SCREEN.TITLE}</Text>
      <Text style={styles.descriptionText}>
        {STRING.HOME_SCREEN.DESCRIPTION}
      </Text>
      <TouchableOpacity>
        <Text style={styles.detailsText}>
          {STRING.HOME_SCREEN.MORE_DETAILS}
        </Text>
      </TouchableOpacity>
      <View style={styles.catageroiesCtr}>
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.NUTRITION}
          handleOnPress={goToNutrition}
          icon={ICONS.Nutrition}
          status={detailsString(nutrition, 1000, STRING.HOME_SCREEN.CALORIES)}
          markerPercentage={nutrition / 1000}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.WATER}
          handleOnPress={goToWaterIntake}
          icon={ICONS.Water}
          status={detailsString(waterIntake, 1000, STRING.HOME_SCREEN.GLASSES)}
          markerPercentage={waterIntake / 1000}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.DAILY_STEPS}
          handleOnPress={goToDailySteps}
          icon={ICONS.ManWalking}
          status={detailsString(todaysSteps, 10000, STRING.HOME_SCREEN.STEPS)}
          markerPercentage={(todaysSteps / 10000) * 100}
        />
      </View>
    </View>
  );
};

const detailsString = (
  value: string | number,
  totalValue: string | number,
  category: string
) => `${value} ${category} / ${totalValue} ${category}`;

export default HomeScreen;
