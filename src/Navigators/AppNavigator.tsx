// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom
import { rootStackParamList } from "../Defs";

// navigators
import OnboardingNav from "./OnboardingNavigator";

const Stack = createNativeStackNavigator<rootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingNav} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
