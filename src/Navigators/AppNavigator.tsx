// libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import AppleHealthKit from "react-native-health";

// navigators
import HomeNavigator from "./HomeDrawerNavigator";

// custom
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { DailySteps, Nutrition, WaterIntake } from "../Screens/MainScreens";
import { homeStackParamList } from "../Defs/navigators";
import { COLORS, STRING } from "../Constants";
import { resetHealthData, updateHealthData } from "../Redux/Reducers/health";
import { storeUserHealthData } from "../Utils/userUtils";

const Stack = createNativeStackNavigator<homeStackParamList>();

const getStartOfDay = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const AppNavigator = () => {
  const { id } = useAppSelector((state) => state.User.data);
  const { value: healthData } = useAppSelector((state) => state.health);
  const dispatch = useAppDispatch();
  if (new Date().toDateString() !== healthData.currentDate) {
    storeUserHealthData(healthData, id!);
    dispatch(resetHealthData());
  }

  const startDate = getStartOfDay().toISOString(); // Start of the current day
  const endDate = new Date().toISOString();

  useEffect(() => {
    AppleHealthKit.getActiveEnergyBurned(
      {
        startDate, // required
        endDate,
        includeManuallyAdded: true, // optional
      },
      (err, results) => {
        console.log(results);
        if (err || results.length === 0) {
          return;
        }
        dispatch(
          updateHealthData({
            nutrition: results.reduce((acc, val) => acc + val.value, 0),
          })
        );
      }
    );
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerBackTitle: STRING.APP_NAVIGATOR.BACK,
        headerShadowVisible: false,
        headerTitle: "",
        headerStyle: { backgroundColor: COLORS.PRIMARY.LIGHT_GREY },
      }}
    >
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Nutrition" component={Nutrition} />
      <Stack.Screen name="DailySteps" component={DailySteps} />
      <Stack.Screen name="WaterIntake" component={WaterIntake} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
