// libs
import React, {useEffect} from 'react';
import {Platform} from 'react-native';

// 3rd party
import {useAppDispatch} from '../Redux/Store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppleHealthKit from 'react-native-health';

// navigators
import HomeNavigator from './HomeDrawerNavigator';

// custom
import {
  DailySteps,
  Nutrition,
  PostScreen,
  StoriesScreen,
  WaterIntake,
} from '../Screens/MainScreens';
import {appStackParamList} from '../Defs';
import {COLORS, STRING} from '../Constants';
import {updateHealthData} from '../Redux/Reducers/health';
import {date} from '../Utils/commonUtils';
import EditProfile from '../Screens/MainScreens/EditProfile';
import BackNavigator from '../Components/Molecules/BackNavigator';
import ResetPassword from '../Screens/MainScreens/ResetPassword';
import GiveFeedback from '../Screens/MainScreens/GiveFeedback';
import AboutUs from '../Screens/MainScreens/AboutUs';
import {useUserData} from '../Hooks/useOffline';

const Stack = createNativeStackNavigator<appStackParamList>();

const AppNavigator = () => {
  // redux use
  const dispatch = useAppDispatch();

  // custom hook
  useUserData();

  // effect use
  useEffect(() => {
    // getting active energy burned data from OS
    if (Platform.OS === 'ios') {
      const startDate = date.getStartOfDay(new Date()).toISOString(); // Start of the current day
      const endDate = date.today().toISOString();
      AppleHealthKit.getActiveEnergyBurned(
        {
          startDate, // required
          endDate,
          includeManuallyAdded: true, // optional
        },
        (err, results) => {
          if (err || results.length === 0) {
            return;
          }
          dispatch(
            updateHealthData({
              nutrition: results.reduce((acc, val) => acc + val.value, 0),
            }),
          );
        },
      );
    }
  }, [dispatch]);

  return (
    <Stack.Navigator
      initialRouteName="HomeNavigator"
      screenOptions={{
        headerBackTitle: STRING.APP_NAVIGATOR.BACK,
        headerShadowVisible: false,
        headerTitle: '',
        headerStyle: {backgroundColor: COLORS.PRIMARY.LIGHT_GREY},
        headerLeft: BackNavigator,
      }}>
      <Stack.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Nutrition" component={Nutrition} />
      <Stack.Screen name="DailySteps" component={DailySteps} />
      <Stack.Screen name="WaterIntake" component={WaterIntake} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen
        name="StoriesScreen"
        component={StoriesScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          presentation: 'containedModal',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="GiveFeedback" component={GiveFeedback} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
