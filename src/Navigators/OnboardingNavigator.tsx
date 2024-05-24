// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// types
import { onboardingStackParamList } from "../Defs";

// screens
import LandingPage from "../Screens/OnboardingScreens";
import Header from "../Components/CustomHeader";
import SignIn from "../Screens/OnboardingScreens/SignIn";

const Stack = createNativeStackNavigator<onboardingStackParamList>();

const Onboarding = () => {
  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{ header: Header }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default Onboarding;
