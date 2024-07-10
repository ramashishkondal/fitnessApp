// libs
import React, {useCallback, useEffect, useState} from 'react';
import {Linking} from 'react-native';

// 3rd party
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import BootSplash from 'react-native-bootsplash';
import RNRestart from 'react-native-restart';

// custom
import OnboardingNav from './OnboardingNavigator';
import AppNavigator from './AppNavigator';
import {Alert, NativeEventEmitter, NativeModules, Platform} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateHealthData} from '../Redux/Reducers/health';
import {CustomLoading} from '../Components';
import {date} from '../Utils/commonUtils';
import {updateUserData} from '../Redux/Reducers/currentUser';
import GoalModal from '../Components/Molecules/GoalModal';
import {useAppSelector} from '../Redux/Store';

// iOS health kit permissions
const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
    ],
    write: [],
  },
} as HealthKitPermissions;

// android permissions
const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
  ],
};

const RootNavigator = () => {
  // state use
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  // redux use
  const dispatch = useDispatch();
  const {hasPermission} = useAppSelector(state => state.health.value);

  // functions
  const onAuthStateChanged = useCallback(
    (userN: FirebaseAuthTypes.User | null) => {
      setUser(userN);
      dispatch(updateUserData({id: userN === null ? undefined : userN.uid}));
      if (initializing) {
        setInitializing(false);
      }
    },
    [dispatch, initializing],
  );

  // effect use
  // useEffect(() => {
  // const subscription = AppState.addEventListener('change', nextAppState => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     console.log('App has come to the foreground!');
  //     if (Platform.OS === 'android') {
  //       check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(val => {
  //         if (val !== 'granted') {
  //           RNRestart.restart();
  //         }
  //       });
  //       if (allowPushNotifications) {
  //         check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(val => {
  //           if (val !== 'granted') {
  //             RNRestart.restart();
  //           }
  //         });
  //       }
  //     }
  //   }
  //   appState.current = nextAppState;
  // });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, [allowPushNotifications]);

  useEffect(() => {
    const healthKitEventEmitter = new NativeEventEmitter(
      NativeModules.AppleHealthKit,
    );

    // constants
    const startDate = date.getStartOfDay(new Date()).toISOString(); // Start of the current day
    const endDate = date.today().toISOString();
    const androidHealthSetup = async () => {
      const authority = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      try {
        if (authority === 'denied') {
          const userAllowed = await request(
            PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
          );
          console.log(userAllowed);
          if (userAllowed === 'blocked' || userAllowed === 'denied') {
            Alert.alert(
              'Activity Recognition permissions denied',
              'You have to allow Activity recognition from the App settings to use full features of the app',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    Alert.alert(
                      'Restart App',
                      'The app needs to be restarted to apply any changes made to the permissions. Please click "OK" to restart now.',
                      [
                        {text: 'OK', onPress: RNRestart.restart},
                        {text: 'Cancel'},
                      ],
                    );

                    Linking.openSettings();
                  },
                },
                {
                  text: 'Cancel',
                },
              ],
            );

            return;
          }
        }
        if (!hasPermission) {
          Alert.alert(
            'Google Fit SignIn required',
            'To track your health data we need access to your google fit account ',
            [
              {
                text: 'ok',
                onPress: async () => {
                  if (!GoogleFit.isAuthorized) {
                    await GoogleFit.authorize(options);
                    dispatch(updateHealthData({hasPermission: true})); // check for if user denies the permissions later in settings
                  }
                },
              },
            ],
          );
        }
        if (GoogleFit.isAuthorized) {
          const today = date.today();
          const stepRes = await GoogleFit.getDailySteps(today);
          const opt = {
            startDate: startDate, // required ISO8601Timestamp
            endDate: today.toISOString(), // required ISO8601Timestamp
          };
          const calories = await GoogleFit.getDailyCalorieSamples(opt);
          dispatch(
            updateHealthData({nutrition: Math.ceil(calories[0].calorie)}),
          );
          dispatch(
            updateHealthData({
              todaysSteps: stepRes.filter(
                val => val.source === 'com.google.android.gms:estimated_steps',
              )[0].steps[0].value,
            }),
          );
        }
      } catch (e) {
        console.log('Error encountered - ', e);
      }
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if (Platform.OS === 'android') {
      androidHealthSetup();
      console.log('android -----');
    } else {
      AppleHealthKit.initHealthKit(permissions, err => {
        if (err) {
          console.log('error getting permission.');
          dispatch(updateHealthData({hasPermission: false}));
          return;
        }
        healthKitEventEmitter.addListener('healthKit:StepCount:new', () => {
          AppleHealthKit.getStepCount(
            {includeManuallyAdded: true},
            (error, result) => {
              if (!error) {
                dispatch(updateHealthData({todaysSteps: result.value}));
                return;
              }
              console.log(
                'error encountered while getting steps data - ',
                error,
              );
            },
          );
        });
        healthKitEventEmitter.addListener(
          'healthKit:ActiveEnergyBurned:new',
          () => {
            AppleHealthKit.getActiveEnergyBurned(
              {
                startDate, // required
                endDate,
                includeManuallyAdded: true, // optional
              },
              (e, results) => {
                if (e || results.length === 0) {
                  return;
                }
                dispatch(
                  updateHealthData({
                    nutrition: results.reduce((acc, val) => acc + val.value, 0),
                  }),
                );
              },
            );
          },
        );

        AppleHealthKit.getStepCount({}, (error, result) => {
          if (!error) {
            dispatch(
              updateHealthData({
                todaysSteps: result.value,
                hasPermission: true,
              }),
            );
            return;
          }
          console.log('error encountered while getting steps data - ', error);
        });
      });
    }
    return subscriber;
  }, [dispatch, onAuthStateChanged, hasPermission]);

  if (initializing) {
    return <CustomLoading />;
  }

  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      {user ? (
        <GoalModal>
          <AppNavigator />
        </GoalModal>
      ) : (
        <OnboardingNav />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
