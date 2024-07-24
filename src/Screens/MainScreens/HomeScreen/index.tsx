// libs
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AppleHealthKit from 'react-native-health';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {
  CustomHomeDetailsCard,
  HeadingText,
  WarningLabel,
} from '../../../Components';
import {IMAGES, STRING} from '../../../Constants';
import {HomeScreenProps} from '../../../Defs';
import {styles} from './styles';
import Animated, {SlideInLeft, Easing} from 'react-native-reanimated';
import {date, getPercentage} from '../../../Utils/commonUtils';
// import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import RNRestart from 'react-native-restart';
import {
  DailyMeals,
  resetMealData,
  resetMealDataItems,
} from '../../../Redux/Reducers/dailyMeal';
import {firebaseDB} from '../../../Utils/userUtils';
import firestore from '@react-native-firebase/firestore';
import {useHealth} from '../../../Hooks/useHealth';
import {PERMISSIONS, check} from 'react-native-permissions';
import {updateHealthData} from '../../../Redux/Reducers/health';
import {
  openHealthConnectSettings,
  getSdkStatus,
  SdkAvailabilityStatus,
} from 'react-native-health-connect';
import ToastError from '../../../Components/Atoms/ToastError';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();
  const [isActivityPermissionsEnabled, setIsActivityPermissionsEnabled] =
    useState(true);

  const {
    todaysSteps,
    waterIntake,
    nutrition,
    hasPermission,
    goal: {noOfGlasses, totalSteps, totalCalorie},
  } = useAppSelector(state => state.health.value);
  const {firstName, id} = useAppSelector(state => state.User.data);

  // getting health data
  useHealth();

  // effect use
  useEffect(() => {
    firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(id!)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const waterIntakeFromDb: number = snapshot.get(
            `${new Date().setHours(0, 0, 0, 0).toString()}.waterIntake`,
          );
          console.log(
            'water intake is ',
            waterIntakeFromDb,
            new Date().setHours(0, 0, 0, 0).toString(),
          );
          if (waterIntakeFromDb) {
            dispatch(updateHealthData({waterIntake: waterIntakeFromDb}));
          } else {
            dispatch(updateHealthData({waterIntake: 0}));
          }
        }
      });
    if (Platform.OS === 'ios') {
      AppleHealthKit.getAuthStatus(
        {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.HeartRate,
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.StepCount,
              AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            ],
            write: [],
          },
        },
        (err, results) => {
          console.log('resfewfw fwef w');
          console.log(err, results);
        },
      );
      AppleHealthKit.initHealthKit(
        {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.HeartRate,
              AppleHealthKit.Constants.Permissions.Steps,
              AppleHealthKit.Constants.Permissions.StepCount,
              AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
            ],
            write: [],
          },
        },
        err => {
          console.log('error', err);
        },
      );
    } else {
      check(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then(val => {
        if (val !== 'granted') {
          setIsActivityPermissionsEnabled(false);
        } else {
          setIsActivityPermissionsEnabled(true);
        }
      });
    }
    // if (finger && isBiometricEnabled === false && shouldAskBiometics) {
    //   Alert.alert(
    //     'Biometric: Sign in from new device detected',
    //     'You have enabled biometric for SignIn in this account would you like to enable it on this device?',
    //     [
    //       {
    //         text: 'Confirm',
    //         onPress: () => {
    //           dispatch(
    //             updateSettingsCachedData({
    //               isBiometricEnabled: true,
    //               shouldAskBiometics: false,
    //             }),
    //           );
    //         },
    //       },
    //       {text: 'Cancel'},
    //       {
    //         text: "Don't ask again",
    //         onPress: () => {
    //           dispatch(updateSettingsCachedData({shouldAskBiometics: false}));
    //         },
    //       },
    //     ],
    //   );
    // }
  }, [dispatch, id]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(firebaseDB.collections.dailyMeals)
      .doc(id!)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          const x = snapshot.get(
            new Date().setHours(0, 0, 0, 0).toString(),
          ) as DailyMeals;
          if (x) {
            console.log('daily meal data is ', x);
            dispatch(resetMealDataItems(x));
          } else {
            dispatch(resetMealData());
          }
        }
      });
    return () => unsubscribe();
  }, [dispatch, id]);

  // functions
  const goToNutrition = (): void => navigation.push('Nutrition');
  const goToWaterIntake = (): void => navigation.push('WaterIntake');
  const goToDailySteps = (): void => navigation.push('DailySteps');

  return (
    <Animated.ScrollView
      style={styles.parent}
      entering={SlideInLeft.easing(Easing.ease)}>
      <HeadingText
        text={`${STRING.HOME_SCREEN.TITLE} ${
          date.today().getHours() > 12 ? 'afternoon' : 'morning'
        }, ${firstName}`}
        headingTextStyle={2}
        textStyle={styles.headingText}
      />

      <Text style={styles.descriptionText}>
        {STRING.HOME_SCREEN.DESCRIPTION}
      </Text>
      <TouchableOpacity activeOpacity={1}>
        <Text style={styles.detailsText}>
          {STRING.HOME_SCREEN.MORE_DETAILS}
        </Text>
      </TouchableOpacity>
      <View style={styles.catageroiesCtr}>
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.NUTRITION}
          handleOnPress={goToNutrition}
          source={IMAGES.NUTRITION}
          status={STRING.HOME_SCREEN.detailsString(
            nutrition,
            totalCalorie,
            STRING.HOME_SCREEN.CALORIES,
          )}
          markerPercentage={getPercentage(nutrition, totalCalorie)}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.WATER}
          handleOnPress={goToWaterIntake}
          source={IMAGES.WATER}
          status={STRING.HOME_SCREEN.detailsString(
            waterIntake,
            noOfGlasses,
            STRING.HOME_SCREEN.GLASSES,
          )}
          markerPercentage={getPercentage(waterIntake, noOfGlasses)}
        />
        <CustomHomeDetailsCard
          title={STRING.HOME_SCREEN.DAILY_STEPS}
          handleOnPress={goToDailySteps}
          source={IMAGES.GUY}
          status={STRING.HOME_SCREEN.detailsString(
            todaysSteps,
            totalSteps,
            STRING.HOME_SCREEN.STEPS,
          )}
          markerPercentage={getPercentage(todaysSteps, totalSteps)}
        />
      </View>

      {isActivityPermissionsEnabled ? null : (
        <WarningLabel
          text="Activity Recognition Permissions not allowed you are using the app in limited mode."
          parentStyle={styles.warningText}
          onPress={() =>
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
            )
          }
        />
      )}
      <View style={styles.spacer} />
      {!hasPermission ? (
        <WarningLabel
          text={`${
            Platform.OS === 'android'
              ? 'Health Connect not configured'
              : 'Health Kit Permissions denied'
          } you are using the app in limited mode.`}
          parentStyle={styles.warningText}
          onPress={
            Platform.OS === 'ios'
              ? () => {
                  Linking.openSettings();
                }
              : () =>
                  Alert.alert(
                    'Health Connect permissions denied',
                    'You have to allow Health Connect steps and total calories permissions from the App settings to use full features of the app',
                    [
                      {
                        text: 'Ok',
                        onPress: () => {
                          const checkAvailability = async () => {
                            const status = await getSdkStatus();
                            if (
                              status === SdkAvailabilityStatus.SDK_AVAILABLE
                            ) {
                              openHealthConnectSettings();
                            }

                            if (
                              status === SdkAvailabilityStatus.SDK_UNAVAILABLE
                            ) {
                              ToastError('Error', 'Health Connect unavailable');
                            }

                            if (
                              status ===
                              SdkAvailabilityStatus.SDK_UNAVAILABLE_PROVIDER_UPDATE_REQUIRED
                            ) {
                              ToastError(
                                'Error',
                                'Health Connect update required',
                              );
                            }
                          };
                          checkAvailability();
                        },
                      },
                      {
                        text: 'Cancel',
                      },
                    ],
                  )
          }
        />
      ) : null}
    </Animated.ScrollView>
  );
};

export default HomeScreen;
