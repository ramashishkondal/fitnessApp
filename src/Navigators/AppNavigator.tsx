// libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import AppleHealthKit from "react-native-health";

// navigators
import HomeNavigator from "./HomeDrawerNavigator";

// custom
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import {
  DailySteps,
  Nutrition,
  PostScreen,
  WaterIntake,
} from "../Screens/MainScreens";
import { homeStackParamList } from "../Defs";
import { COLORS, STRING } from "../Constants";
import { resetHealthData, updateHealthData } from "../Redux/Reducers/health";
import { storeUserHealthData } from "../Utils/userUtils";
import { Platform } from "react-native";
import { date } from "../Utils/commonUtils";

const Stack = createNativeStackNavigator<homeStackParamList>();

const AppNavigator = () => {
  // constants
  const startDate = date.getStartOfDay(new Date()).toISOString(); // Start of the current day
  const endDate = date.today().toISOString();

  // redux use
  const { id } = useAppSelector((state) => state.User.data);
  const { value: healthData } = useAppSelector((state) => state.health);
  const dispatch = useAppDispatch();
  if (new Date().toDateString() !== healthData.currentDate) {
    storeUserHealthData(healthData, id!);
    dispatch(resetHealthData());
  }

  useEffect(() => {
    if (Platform.OS === "ios") {
      AppleHealthKit.getActiveEnergyBurned(
        {
          startDate, // required
          endDate,
          includeManuallyAdded: true, // optional
        },
        (err, results) => {
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
    } else {
    }
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
      <Stack.Screen name="PostScreen" component={PostScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
