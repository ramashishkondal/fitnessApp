import {
  Alert,
  Linking,
  Platform,
  NativeEventEmitter,
  NativeModules,
  AppState, // <- Import AppState
} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';
import AppleHealthKit, {HealthValue} from 'react-native-health';
import {AppleHealthPermissions} from '../Constants/commonConstants';
import {updateHealthData} from '../Redux/Reducers/health';
import {date} from '../Utils/commonUtils';
import RNRestart from 'react-native-restart';
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {useCallback, useEffect, useState} from 'react'; // <- Import useState
import {
  initialize,
  readRecords,
  requestPermission,
} from 'react-native-health-connect';
import {updateSettingsHealthConnectPermissions} from '../Redux/Reducers/userSettings';

const pollingRateAndroidHealth = 300000;

export const useHealth = () => {
  // redux use
  const dispatch = useAppDispatch();
  const {createdOn} = useAppSelector(state => state.User.data);
  const {hasPermission} = useAppSelector(state => state.health.value);
  const {healthConnectPermissions} = useAppSelector(
    state => state.settings.data,
  );

  // State to track the app's current state
  const [appState, setAppState] = useState(AppState.currentState);

  // functions
  const androidHealthSetup = useCallback(async () => {
    const checkPermissionsActivityRecognition = async () => {
      const authority = await check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
      if (authority === 'denied' || authority === 'blocked') {
        dispatch(updateHealthData({hasPermission: false}));
        return false;
      }
      return true;
    };

    try {
      const hasPermissionActivityRecognition =
        await checkPermissionsActivityRecognition();
      if (!hasPermissionActivityRecognition) {
        const userAllowedActivityRecognition = await request(
          PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
        );
        if (
          userAllowedActivityRecognition === 'blocked' ||
          userAllowedActivityRecognition === 'denied'
        ) {
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

      const isInitializedHealthConnect = await initialize();
      if (isInitializedHealthConnect) {
        // get data from health connect
        const handleDataFromHealthConnect = async () => {
          const dateAfter = () => {
            // Parse the createdOn date
            const accountCreationDate = new Date(createdOn);

            // Get today's date at midnight
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Create a new Date object for accountCreationDate at midnight
            const accountCreationDateMidnight = new Date(accountCreationDate);
            accountCreationDateMidnight.setHours(0, 0, 0, 0);

            // Compare the dates
            if (accountCreationDateMidnight.getTime() === today.getTime()) {
              console.log('this ran');

              return accountCreationDate;
            }

            // Return today's date if they don't match
            return today;
          };

          const startTimeForHealthData = dateAfter();
          const stepsRes = await readRecords('Steps', {
            timeRangeFilter: {
              operator: 'after',
              startTime: startTimeForHealthData.toISOString(),
            },
          });
          const caloriesRes = await readRecords('TotalCaloriesBurned', {
            timeRangeFilter: {
              operator: 'after',
              startTime: startTimeForHealthData.toISOString(),
            },
          });
          const bmrRes = await readRecords('BasalMetabolicRate', {
            timeRangeFilter: {
              operator: 'after',
              startTime: '2024-07-22T18:30:00.000Z',
            },
          });

          // bmr addition to calories data
          let bmrPer30mins = 0;
          if (bmrRes.length) {
            bmrPer30mins =
              (bmrRes[1].basalMetabolicRate.inKilocaloriesPerDay / 1440) *
              30 *
              new Date().getHours() *
              2;
            if (new Date().getMinutes() >= 30) {
              bmrPer30mins +=
                (bmrRes[1].basalMetabolicRate.inKilocaloriesPerDay / 1440) * 30;
            }
          }
          const totalCaloriesOfToday = Math.floor(
            caloriesRes.reduce(
              (acc, val) => acc + val.energy.inKilocalories,
              0,
            ),
          );
          const totalStepsOfToday = stepsRes.reduce(
            (acc, val) => acc + val.count,
            0,
          );

          dispatch(
            updateHealthData({
              nutrition: Math.round(totalCaloriesOfToday + bmrPer30mins),
              todaysSteps: totalStepsOfToday,
            }),
          );
        };

        const handlePermissionsHealthConnect = async () => {
          const grantedPermissions = await requestPermission([
            {accessType: 'read', recordType: 'Steps'},
            {accessType: 'read', recordType: 'TotalCaloriesBurned'},
            {accessType: 'read', recordType: 'BasalMetabolicRate'},
          ]);
          console.log('permissions ', grantedPermissions);
          dispatch(
            updateSettingsHealthConnectPermissions({
              calories: grantedPermissions.some(
                val =>
                  val.accessType === 'read' &&
                  val.recordType === 'TotalCaloriesBurned',
              ),
              steps: grantedPermissions.some(
                val => val.accessType === 'read' && val.recordType === 'Steps',
              ),
            }),
          );
          return {
            steps: grantedPermissions.some(
              val =>
                val.accessType === 'read' &&
                val.recordType === 'TotalCaloriesBurned',
            ),
            calories: grantedPermissions.some(
              val => val.accessType === 'read' && val.recordType === 'Steps',
            ),
          };
        };
        if (
          !(healthConnectPermissions.steps && healthConnectPermissions.calories)
        ) {
          Alert.alert(
            'Health Connect is required',
            'To track your health data we need access to your Health connect data. ',
            [
              {
                text: 'ok',
                onPress: async () => {
                  const grantedPermissionFromHealthConnect =
                    await handlePermissionsHealthConnect();
                  if (
                    grantedPermissionFromHealthConnect.steps &&
                    grantedPermissionFromHealthConnect.calories
                  ) {
                    await handleDataFromHealthConnect();
                    setInterval(() => {
                      handleDataFromHealthConnect().catch(e => {
                        console.log('error in health connect ', e);
                      });
                    }, pollingRateAndroidHealth);
                  }
                },
              },
              {
                text: 'cancel',
                onPress: () => {
                  handlePermissionsHealthConnect;
                },
              },
            ],
          );
        }

        if (isInitializedHealthConnect) {
          if (hasPermission) {
            handleDataFromHealthConnect().catch(e => {
              if (e.message.includes('lacks the following permissions')) {
                if (
                  e.message.includes('[android.permission.health.READ_STEPS]')
                ) {
                  dispatch(
                    updateSettingsHealthConnectPermissions({steps: false}),
                  );
                }
                if (
                  e.message.includes(
                    '[android.permission.health.READ_TOTAL_CALORIES_BURNED]',
                  )
                ) {
                  dispatch(
                    updateSettingsHealthConnectPermissions({calories: false}),
                  );
                }
              }
            });
          }
          setInterval(() => {
            if (hasPermission) {
              handleDataFromHealthConnect().catch(e => {
                console.log('error in health connect ', e);
              });
            }
          }, pollingRateAndroidHealth);
        }
      }
    } catch (e) {
      console.log('Error encountered - ', e);
    }
  }, [
    createdOn,
    dispatch,
    hasPermission,
    healthConnectPermissions.calories,
    healthConnectPermissions.steps,
  ]);

  const iosHealthSetup = useCallback(() => {
    const endDate = date.today().toISOString();
    const dateAfter = () => {
      // Parse the createdOn date
      const accountCreationDate = new Date(createdOn);

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Create a new Date object for accountCreationDate at midnight
      const accountCreationDateMidnight = new Date(accountCreationDate);
      accountCreationDateMidnight.setHours(0, 0, 0, 0);

      // Compare the dates
      if (accountCreationDateMidnight.getTime() === today.getTime()) {
        console.log('this ran');

        return accountCreationDate;
      }

      // Return today's date if they don't match
      return today;
    };
    const startDate = dateAfter().toISOString();
    // iOS health kit setup
    const healthKitEventEmitter = new NativeEventEmitter(
      NativeModules.AppleHealthKit,
    );
    AppleHealthKit.initHealthKit(AppleHealthPermissions, err => {
      if (err) {
        console.log('error getting permission.');
        dispatch(
          updateSettingsHealthConnectPermissions({
            steps: false,
            calories: false,
          }),
        );
        return;
      }
      const handleHealthKitStepsData = (error: string, result: HealthValue) => {
        if (!error) {
          console.log('steps changed', result);
          dispatch(updateHealthData({todaysSteps: result.value}));
          dispatch(
            updateSettingsHealthConnectPermissions({
              steps: true,
            }),
          );
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
        dispatch(
          updateSettingsHealthConnectPermissions({
            calories: true,
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
            }),
          );
          dispatch(updateSettingsHealthConnectPermissions({steps: true}));

          return;
        }
        console.log('error encountered while getting steps data -  ', error);
      };

      AppleHealthKit.getStepCount({}, handleStepsDataUnattached);
    });
  }, [createdOn, dispatch]);

  // Effect use for Android Health Setup
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (Platform.OS === 'android') {
          androidHealthSetup();
        } else {
          iosHealthSetup();
        }
      }
      setAppState(nextAppState);
    });

    // Cleanup the subscription
    return () => {
      subscription.remove();
    };
  }, [appState, androidHealthSetup, iosHealthSetup]);

  // Initial Setup
  useEffect(() => {
    if (Platform.OS === 'android') {
      androidHealthSetup();
    } else {
      iosHealthSetup();
    }
  }, [androidHealthSetup, iosHealthSetup]);
};
