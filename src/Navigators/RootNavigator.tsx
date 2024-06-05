// libs
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

// navigators
import OnboardingNav from "./OnboardingNavigator";
import { User } from "../Defs";
import AppNavigator from "./AppNavigator";
import AppleHealthKit, { HealthKitPermissions } from "react-native-health";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { updateHealthData } from "../Redux/Reducers/health";

const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
    ],
    write: [],
  },
} as HealthKitPermissions;

const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();

  // Handle user state changes
  function onAuthStateChanged(userN: any) {
    setUser(userN);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (Platform.OS !== "ios") {
      return;
    }
    AppleHealthKit.initHealthKit(permissions, (err) => {
      if (err) {
        console.log("error getting permission.");
        return;
      }
      dispatch(updateHealthData({ hasPermission: true }));
      AppleHealthKit.getStepCount({}, (err, result) => {
        if (!err) {
          dispatch(updateHealthData({ todaysSteps: result.value }));
          return;
        }
        console.log("error encountered while getting steps data - ", err);
      });
    });
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      {!user ? <OnboardingNav /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
