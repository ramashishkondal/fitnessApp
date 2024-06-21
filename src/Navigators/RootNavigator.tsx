// libs
import React, { useEffect, useState } from "react";

// 3rd party
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes, firebase } from "@react-native-firebase/auth";
import AppleHealthKit, { HealthKitPermissions } from "react-native-health";
import GoogleFit, { Scopes } from "react-native-google-fit";
import { PERMISSIONS, check, request } from "react-native-permissions";

// custom
import OnboardingNav from "./OnboardingNavigator";
import AppNavigator from "./AppNavigator";
import { Platform } from "react-native";
import { useDispatch } from "react-redux";
import { updateHealthData } from "../Redux/Reducers/health";
import { CustomLoading } from "../Components";
import { date, getLastWeekDayDate } from "../Utils/commonUtils";
import { updateUserData } from "../Redux/Reducers/currentUser";

// iOS health kit permissions
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
    write: [],
  },
} as HealthKitPermissions;

// android permissions
const options = {
  scopes: [Scopes.FITNESS_ACTIVITY_READ, Scopes.FITNESS_ACTIVITY_WRITE],
};

const RootNavigator = () => {
  // state use
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // redux use
  const dispatch = useDispatch();

  // effect use
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
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
    return subscriber;
  }, []);

  // functions
  const androidHealthSetup = async () => {
    try {
      const authority = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      if (authority === "denied") {
        await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      }
      if (!GoogleFit.isAuthorized) {
        await GoogleFit.authorize(options);
        dispatch(updateHealthData({ hasPermission: true })); // check for if user denies the permissions later in settings
      }
      const today = date.today();
      const stepRes = await GoogleFit.getDailySteps(today);
      const startDate = date.getStartOfDay(today);
      const opt = {
        startDate: startDate.toISOString(), // required ISO8601Timestamp
        endDate: today.toISOString(), // required ISO8601Timestamp
      };
      const calories = await GoogleFit.getDailyCalorieSamples(opt);
      dispatch(updateHealthData({ nutrition: ~~calories[0].calorie }));
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

  function onAuthStateChanged(userN: FirebaseAuthTypes.User | null) {
    setUser(userN);
    dispatch(updateUserData({ id: userN === null ? undefined : userN.uid }));
    if (initializing) setInitializing(false);
  }

  if (initializing) return <CustomLoading />;

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <OnboardingNav />}
    </NavigationContainer>
  );
};

export default RootNavigator;
