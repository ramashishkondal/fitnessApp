import {
  Alert,
  Linking,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import AppleHealthKit from 'react-native-health';

import {AppleHealthPermissions} from '../Constants/commonConstants';
import {updateHealthData} from '../Redux/Reducers/health';
import {date} from '../Utils/commonUtils';
import RNRestart from 'react-native-restart';
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {useCallback, useEffect} from 'react';
import {
  initialize,
  readRecords,
  requestPermission,
} from 'react-native-health-connect';

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
      const isInitialized = await initialize();

      if (!hasPermission) {
        Alert.alert(
          'Health Connect is required',
          'To track your health data we need access to your Health connect data. ',
          [
            {
              text: 'ok',
              onPress: async () => {
                const grantedPermissions = await requestPermission([
                  {accessType: 'read', recordType: 'Steps'},
                  {accessType: 'read', recordType: 'TotalCaloriesBurned'},
                ]);
                console.log('permissions ', grantedPermissions);
                if (isInitialized) {
                  const stepsRes = await readRecords('Steps', {
                    timeRangeFilter: {
                      operator: 'between',
                      startTime: new Date(
                        new Date().setHours(0, 0, 0, 0),
                      ).toISOString(),
                      endTime: date.today().toISOString(),
                    },
                  });
                  const caloriesRes = await readRecords('TotalCaloriesBurned', {
                    timeRangeFilter: {
                      operator: 'after',
                      startTime: new Date(new Date().setHours(0)).toISOString(),
                    },
                  });

                  dispatch(
                    updateHealthData({
                      nutrition: Math.floor(
                        caloriesRes.reduce(
                          (acc, val) => acc + val.energy.inKilocalories,
                          0,
                        ),
                      ),
                      hasPermission: true,
                      todaysSteps: stepsRes.reduce(
                        (acc, val) => acc + val.count,
                        0,
                      ),
                    }),
                  );
                }
              },
            },
          ],
        );
      }
      if (isInitialized) {
        const stepsRes = await readRecords('Steps', {
          timeRangeFilter: {
            operator: 'between',
            startTime: startDate,
            endTime: date.today().toISOString(),
          },
        });

        const caloriesRes = await readRecords('TotalCaloriesBurned', {
          timeRangeFilter: {
            operator: 'after',
            startTime: new Date(new Date().setHours(0)).toISOString(),
          },
        });
        dispatch(
          updateHealthData({
            nutrition: Math.floor(
              caloriesRes.reduce(
                (acc, val) => acc + val.energy.inKilocalories,
                0,
              ),
            ),
            todaysSteps: stepsRes.reduce((acc, val) => acc + val.count, 0),
          }),
        );
      }
    } catch (e) {
      console.log('Error encountered - ', e);
    }
  }, [dispatch, hasPermission]);

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
              console.log('steps changed', result);
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

          return;
        }
        console.log('error encountered while getting steps data -  ', error);
      });
    });
  }, [dispatch]);

  // effect use
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidHealthSetup();
    } else {
      iosHealthSetup();
    }
  }, [androidHealthSetup, dispatch, id, iosHealthSetup]);
};
