import {
  Alert,
  Linking,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import AppleHealthKit from 'react-native-health';
import GoogleFit from 'react-native-google-fit';
import {
  AndroidGoogleFitPermissions,
  AppleHealthPermissions,
} from '../Constants/commonConstants';
import firestore from '@react-native-firebase/firestore';
import {updateHealthData} from '../Redux/Reducers/health';
import {date} from '../Utils/commonUtils';
import RNRestart from 'react-native-restart';
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {useCallback, useEffect} from 'react';
import {firebaseDB, storeNewUserHealthData} from '../Utils/userUtils';

export const useHealth = () => {
  // redux use
  const dispatch = useAppDispatch();
  const {hasPermission} = useAppSelector(state => state.health.value);
  const {id} = useAppSelector(state => state.User.data);

  // functions
  const androidHealthSetup = useCallback(async () => {
    const startDate = date.getStartOfDay(new Date()).toISOString(); // Start of the current day
    const authority = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
    try {
      if (authority === 'denied') {
        dispatch(updateHealthData({hasPermission: false}));
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
                  await GoogleFit.authorize(AndroidGoogleFitPermissions);
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

        storeNewUserHealthData(id!, {
          nutrition: Math.ceil(calories[0].calorie),
          waterIntake: 0,
          goal: {
            totalCalorie: 8000,
            noOfGlasses: 6,
            totalSteps: 10000,
          },
          currentDate: new Date().toISOString(),
          todaysSteps: stepRes.filter(
            val => val.source === 'com.google.android.gms:estimated_steps',
          )[0].steps[0].value,
          hasPermission,
        });

        dispatch(updateHealthData({nutrition: Math.ceil(calories[0].calorie)}));
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
  }, [dispatch, hasPermission, id]);

  const iosHealthSetup = useCallback(() => {
    const startDate = date.getStartOfDay(new Date()).toISOString(); // Start of the current day
    const endDate = date.today().toISOString();

    // iOS health kit setup
    const healthKitEventEmitter = new NativeEventEmitter(
      NativeModules.AppleHealthKit,
    );
    AppleHealthKit.initHealthKit(AppleHealthPermissions, err => {
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
            console.log('error encountered while getting steps data - ', error);
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
          storeNewUserHealthData(id!, {
            nutrition: 0,
            waterIntake: 0,
            goal: {
              totalCalorie: 8000,
              noOfGlasses: 6,
              totalSteps: 10000,
            },
            currentDate: new Date().toISOString(),
            todaysSteps: result.value,
            hasPermission,
          });
          return;
        }
        console.log('error encountered while getting steps data - ', error);
      });
    });
  }, [dispatch, hasPermission, id]);

  // effect use
  useEffect(() => {
    firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(id!)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const waterIntake: number = snapshot.get(
            `${new Date().setHours(0, 0, 0, 0).toString()}.waterIntake`,
          );
          if (waterIntake) {
            dispatch(updateHealthData({waterIntake}));
          }
        }
      });
    if (Platform.OS === 'android') {
      androidHealthSetup();
    } else {
      iosHealthSetup();
    }
  }, [androidHealthSetup, dispatch, id, iosHealthSetup]);
};
