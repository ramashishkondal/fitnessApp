// libs
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingNav from "./OnboardingNavigator";

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <OnboardingNav />
    </NavigationContainer>
  );
};

export default RootNavigator;
