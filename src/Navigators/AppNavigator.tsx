// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// types
import { rootStackParamList } from "../Defs";

// navigators
import Onboarding from "./OnboardingNavigator";

const Stack = createNativeStackNavigator<rootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
