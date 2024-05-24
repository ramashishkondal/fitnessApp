// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// types
import { onboardingStackParamList } from "../Defs";

// screens
import LandingPage from "../Screens/OnboardingScreens";

const Stack = createNativeStackNavigator<onboardingStackParamList>();

const Onboarding = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="LandingPage" component={LandingPage} />
    </Stack.Navigator>
  );
};

export default Onboarding;
