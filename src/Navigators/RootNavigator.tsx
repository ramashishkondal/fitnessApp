// libs
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import AppleHealthKit, { HealthKitPermissions } from "react-native-health";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { PERMISSIONS, check, request } from "react-native-permissions";

// custom
import OnboardingNav from "./OnboardingNavigator";
import { User } from "../Defs";
import AppNavigator from "./AppNavigator";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { updateHealthData } from "../Redux/Reducers/health";
import { CustomLoading } from "../Components";

// iOS health kit permissions
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

  const androidHealthSetup = async () => {
    // android permissions
    const options = {
      scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
    };
    try {
      const authority = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      if (authority === "denied") {
        await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      }
      if (!GoogleFit.isAuthorized) {
        await GoogleFit.authorize(options);
        dispatch(updateHealthData({ hasPermission: true })); // check for if user denies the permissions later in settings
      }
      const stepRes = await GoogleFit.getDailySteps(new Date());
      dispatch(
        updateHealthData({
          todaysSteps: stepRes.filter(
            (val) => val.source === "com.google.android.gms:estimated_steps"
          )[0].steps[0].value,
        })
      );
    } catch (e) {
      console.log("Error encountered - ", e);
    }
  };

  function onAuthStateChanged(userN: any) {
    setUser(userN);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  useEffect(() => {
    if (Platform.OS !== "ios") {
      androidHealthSetup();
      console.log("android -----");
    } else {
      AppleHealthKit.initHealthKit(permissions, (err) => {
        if (err) {
          console.log("error getting permission.");
          return;
        }
        dispatch(updateHealthData({ hasPermission: true }));
        AppleHealthKit.getStepCount({}, (error, result) => {
          if (!error) {
            dispatch(updateHealthData({ todaysSteps: result.value }));
            return;
          }
          console.log("error encountered while getting steps data - ", error);
        });
      });
    }
  }, []);
  if (initializing) return <CustomLoading />;
  return (
    <NavigationContainer>
      {!user ? <OnboardingNav /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
