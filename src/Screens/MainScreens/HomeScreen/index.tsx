// libs
import React, {useEffect} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {CustomHomeDetailsCard, HeadingText} from '../../../Components';
import {ICONS, STRING} from '../../../Constants';
import {HomeScreenProps} from '../../../Defs';
import {styles} from './styles';
import Animated, {SlideInLeft, Easing} from 'react-native-reanimated';
import {date, getPercentage} from '../../../Utils/commonUtils';
import {updateSettingsCachedData} from '../../../Redux/Reducers/userSettings';

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  // redux use
  const dispatch = useAppDispatch();

  const {
    todaysSteps,
    waterIntake,
    nutrition,
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
    </Animated.View>
  );
};

export default HomeScreen;
