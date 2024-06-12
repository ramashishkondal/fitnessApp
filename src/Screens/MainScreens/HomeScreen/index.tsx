// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { useAppSelector } from "../../../Redux/Store";
import { CustomHomeDetailsCard } from "../../../Components";
import { ICONS, STRING } from "../../../Constants";
import { HomeScreenProps } from "../../../Defs";
import { styles } from "./styles";
import Animated, { SlideInLeft, Easing } from "react-native-reanimated";

const currentTime = new Date().getHours();

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // redux use
  const {
    todaysSteps,
    waterIntake,
    nutrition,
    goal: { noOfGlasses, totalSteps, totalCalorie },
  } = useAppSelector((state) => state.health.value);
  const { firstName } = useAppSelector((state) => state.User.data);

  // functions
  const goToNutrition = (): void => navigation.push("Nutrition");
  const goToWaterIntake = (): void => navigation.push("WaterIntake");
  const goToDailySteps = (): void => navigation.push("DailySteps");

  return (
    <Animated.View
      style={styles.parent}
      entering={SlideInLeft.easing(Easing.ease)}
    >
      <Text style={styles.titleText}>
        {STRING.HOME_SCREEN.TITLE} {currentTime > 13 ? "Evening" : "Morning"}{" "}
        {firstName}
      </Text>
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
          status={STRING.HOME_SCREEN.detailsString(
            nutrition,
            totalCalorie,
            STRING.HOME_SCREEN.CALORIES
          )}
          markerPercentage={(nutrition / totalCalorie) * 100}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.WATER}
          handleOnPress={goToWaterIntake}
          icon={ICONS.Water}
          status={STRING.HOME_SCREEN.detailsString(
            waterIntake,
            noOfGlasses,
            STRING.HOME_SCREEN.GLASSES
          )}
          markerPercentage={(waterIntake / noOfGlasses) * 100}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.DAILY_STEPS}
          handleOnPress={goToDailySteps}
          icon={ICONS.ManWalking}
          status={STRING.HOME_SCREEN.detailsString(
            todaysSteps,
            totalSteps,
            STRING.HOME_SCREEN.STEPS
          )}
          markerPercentage={(todaysSteps / totalSteps) * 100}
        />
      </View>
    </Animated.View>
  );
};

export default HomeScreen;
