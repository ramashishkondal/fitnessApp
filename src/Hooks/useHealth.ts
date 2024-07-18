import {
  Alert,
  Linking,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import AppleHealthKit, {HealthValue} from 'react-native-health';

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

const pollingRateAndroidHealth = 300000;

export const useHealth = () => {
  // redux use
  const dispatch = useAppDispatch();
  const {hasPermission} = useAppSelector(state => state.health.value);
  const {id} = useAppSelector(state => state.User.data);

  // functions
  const androidHealthSetup = useCallback(async () => {
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

      const handleDataFromHealthConnect = async (permissions?: boolean) => {
        const stepsRes = await readRecords('Steps', {
          timeRangeFilter: {
            operator: 'after',
            startTime: new Date(new Date().setHours(0)).toISOString(),
          },
        });
        const caloriesRes = await readRecords('TotalCaloriesBurned', {
          timeRangeFilter: {
            operator: 'after',
            startTime: new Date(new Date().setHours(0)).toISOString(),
          },
        });
        const totalCaloriesOfToday = Math.floor(
          caloriesRes.reduce((acc, val) => acc + val.energy.inKilocalories, 0),
        );
        const totalStepsOfToday = stepsRes.reduce(
          (acc, val) => acc + val.count,
          0,
        );
        if (permissions === undefined) {
          dispatch(
            updateHealthData({
              nutrition: totalCaloriesOfToday,
              todaysSteps: totalStepsOfToday,
            }),
          );
        } else {
          dispatch(
            updateHealthData({
              nutrition: totalCaloriesOfToday,
              hasPermission: permissions,
              todaysSteps: totalStepsOfToday,
            }),
          );
        }
      };

      if (!hasPermission) {
        const handlePermissions = async () => {
          const grantedPermissions = await requestPermission([
            {accessType: 'read', recordType: 'Steps'},
            {accessType: 'read', recordType: 'TotalCaloriesBurned'},
          ]);
          console.log('permissions ', grantedPermissions);

          if (isInitialized) {
            handleDataFromHealthConnect(grantedPermissions.length > 0);
          }
        };

        Alert.alert(
          'Health Connect is required',
          'To track your health data we need access to your Health connect data. ',
          [
            {
              text: 'ok',
              onPress: () => {
                handlePermissions();
              },
            },
          ],
        );
      }
      if (isInitialized) {
        setInterval(() => {
          if (hasPermission) {
            handleDataFromHealthConnect().catch(e => {
              console.log('error in health connect ', e);
            });
          }
        }, pollingRateAndroidHealth);
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
      const handleHealthKitStepsData = (error: string, result: HealthValue) => {
        if (!error) {
          console.log('steps changed', result);
          dispatch(updateHealthData({todaysSteps: result.value}));
          return;
        }
        console.log('error encountered while getting steps data - ', error);
      };

      healthKitEventEmitter.addListener('healthKit:StepCount:new', () => {
        AppleHealthKit.getStepCount(
          {includeManuallyAdded: true},
          handleHealthKitStepsData,
        );
      });

      const totalEnergyBurned = (acc: number, val: HealthValue) =>
        acc + val.value;
      const handleEnergyBurnedData = (
        error: string,
        results: HealthValue[],
      ) => {
        if (error || results.length === 0) {
          return;
        }
        dispatch(
          updateHealthData({
            nutrition: results.reduce(totalEnergyBurned, 0),
          }),
        );
      };
      healthKitEventEmitter.addListener(
        'healthKit:ActiveEnergyBurned:new',
        () => {
          AppleHealthKit.getActiveEnergyBurned(
            {
              startDate, // required
              endDate,
              includeManuallyAdded: true, // optional
            },
            handleEnergyBurnedData,
          );
        },
      );

      const handleStepsDataUnattached = (
        error: string,
        result: HealthValue,
      ) => {
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
      };

      AppleHealthKit.getStepCount({}, handleStepsDataUnattached);
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
