// libs
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

// navigators
import OnboardingNav from "./OnboardingNavigator";
import { User } from "../Defs";
import AppNavigator from "./AppNavigator";

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  // Handle user state changes
  function onAuthStateChanged(userN: any) {
    setUser(userN);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    // auth().signOut();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;
  console.log(user);
  return (
    <NavigationContainer>
      {!user ? <OnboardingNav /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
