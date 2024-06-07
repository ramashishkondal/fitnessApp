// libs
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// navigators
import HomeNavigator from "./HomeDrawerNavigator";

// custom
import { useAppDispatch, useAppSelector } from "../Redux/Store";
import { DailySteps, Nutrition, WaterIntake } from "../Screens/MainScreens";
import { homeStackParamList } from "../Defs/navigators";
import { COLORS, STRING } from "../Constants";
import { resetHealthData } from "../Redux/Reducers/health";
import { storeUserHealthData } from "../Utils/userUtils";

const Stack = createNativeStackNavigator<homeStackParamList>();
const AppNavigator = () => {
  const { id } = useAppSelector((state) => state.User.data);
  const { value: healthData } = useAppSelector((state) => state.health);
  const dispatch = useAppDispatch();
  if (new Date().toDateString() !== healthData.currentDate) {
    storeUserHealthData(healthData, id!);
    dispatch(resetHealthData());
  }
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
