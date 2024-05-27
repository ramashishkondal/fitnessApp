// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom
import {
  LandingPage,
  SignIn,
  EmailLogIn,
  AddPassword,
} from "../Screens/OnboardingScreens";
import { CustomHeader } from "../Components";
import { onboardingStackParamList } from "../Defs";

const Stack = createNativeStackNavigator<onboardingStackParamList>();

const OnboardingNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="LandingPage"
      screenOptions={{ header: CustomHeader }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="EmailLogIn" component={EmailLogIn} />
      <Stack.Screen name="AddPassword" component={AddPassword} />
    </Stack.Navigator>
  );
};

export default OnboardingNav;
