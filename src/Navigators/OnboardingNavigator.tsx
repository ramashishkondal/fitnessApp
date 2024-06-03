// libs
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// custom
import {
  LandingPage,
  SignIn,
  AddEmail,
  AddPassword,
  AddFingerprint,
  AddProfilePicture,
  AddPreferences,
  AddInterests,
  AddGender,
  DetailsCompleted,
} from "../Screens/OnboardingScreens";
import { CustomHeader } from "../Components";
import { onboardingStackParamList } from "../Defs";

const Stack = createNativeStackNavigator<onboardingStackParamList>();

const OnboardingNav = () => {
  return (
    <Stack.Navigator
      initialRouteName={"LandingPage"}
      screenOptions={{ header: CustomHeader, animationDuration: 500 }}
    >
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="AddEmail" component={AddEmail} />
      <Stack.Screen name="AddPassword" component={AddPassword} />
      <Stack.Screen name="AddFingerprint" component={AddFingerprint} />
      <Stack.Screen name="AddProfilePicture" component={AddProfilePicture} />
      <Stack.Screen name="AddPreferences" component={AddPreferences} />
      <Stack.Screen name="AddInterests" component={AddInterests} />
      <Stack.Screen name="AddGender" component={AddGender} />
      <Stack.Screen
        name="DetailsCompleted"
        component={DetailsCompleted}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNav;
