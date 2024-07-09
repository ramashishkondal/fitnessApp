// libs
import React, {useEffect} from 'react';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {
  CustomHomeDetailsCard,
  HeadingText,
  WarningLabel,
} from '../../../Components';
import {ICONS, STRING} from '../../../Constants';
import {HomeScreenProps} from '../../../Defs';
import {styles} from './styles';
import Animated, {SlideInLeft, Easing} from 'react-native-reanimated';
import {date, getPercentage} from '../../../Utils/commonUtils';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';
import RNRestart from 'react-native-restart';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  const {
    todaysSteps,
    waterIntake,
    nutrition,
    hasPermission,
    goal: {noOfGlasses, totalSteps, totalCalorie},
  } = useAppSelector(state => state.health.value);
  const {firstName, finger} = useAppSelector(state => state.User.data);
  const {cachedData} = useAppSelector(state => state.settings.data);
  const {isBiometricEnabled, shouldAskBiometics} = useAppSelector(
    state => state.settings.data.cachedData,
  );

  console.log('cached data in home screen is ', cachedData);
  // effect use
  useEffect(() => {
    if (finger && isBiometricEnabled === false && shouldAskBiometics) {
      Alert.alert(
        'Biometric: Sign in from new device detected',
        'You have enabled biometric for SignIn in this account would you like to enable it on this device?',
        [
          {
            text: 'Confirm',
            onPress: () => {
              dispatch(
                updateSettingsCachedData({
                  isBiometricEnabled: true,
                  shouldAskBiometics: false,
                }),
              );
            },
          },
          {text: 'Cancel'},
          {
            text: "Don't ask again",
            onPress: () => {
              dispatch(updateSettingsCachedData({shouldAskBiometics: false}));
            },
          },
        ],
      );
    }
  }, [dispatch, finger, isBiometricEnabled, shouldAskBiometics]);

  // functions
  const goToNutrition = (): void => navigation.push('Nutrition');
  const goToWaterIntake = (): void => navigation.push('WaterIntake');
  const goToDailySteps = (): void => navigation.push('DailySteps');

  return (
    <Animated.View
      style={styles.parent}
      entering={SlideInLeft.easing(Easing.ease)}>
      <HeadingText
        text={`${STRING.HOME_SCREEN.TITLE} ${
          date.today().getHours() > 12 ? 'Afternoon' : 'Morning'
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
          icon={ICONS.Nutrition}
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
          icon={ICONS.Water}
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
          icon={ICONS.ManWalking}
          status={STRING.HOME_SCREEN.detailsString(
            todaysSteps,
            totalSteps,
            STRING.HOME_SCREEN.STEPS,
          )}
          markerPercentage={getPercentage(todaysSteps, totalSteps)}
        />
      </View>
      {!hasPermission ? (
        <WarningLabel
          text="Activity Recognition Permissions not allowed you are using the app in limited mode."
          parentStyle={{padding: 16}}
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
      ) : null}
    </Animated.View>
  );
};

export default HomeScreen;
