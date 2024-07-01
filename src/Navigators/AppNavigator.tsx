// libs
import React, {useEffect} from 'react';
import {Platform} from 'react-native';

// 3rd party
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppleHealthKit from 'react-native-health';
import notifee from '@notifee/react-native';
import firestore, {Timestamp} from '@react-native-firebase/firestore';

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
import {resetHealthData, updateHealthData} from '../Redux/Reducers/health';
import {
  UserFromFirebaseDb,
  firebaseDB,
  getUserData,
  storeUserHealthData,
  updateNotificationReadStatus,
} from '../Utils/userUtils';
import {date} from '../Utils/commonUtils';
import EditProfile from '../Screens/MainScreens/EditProfile';
import {updateUserData} from '../Redux/Reducers/currentUser';
import BackNavigator from '../Components/Molecules/BackNavigator';
import ResetPassword from '../Screens/MainScreens/ResetPassword';

const Stack = createNativeStackNavigator<appStackParamList>();

async function onDisplayNotification(message: string) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    vibration: true,
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification',
    body: message,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

const AppNavigator = () => {
  // navigator use

  // redux use
  const {id} = useAppSelector(state => state.User.data);
  const {value: healthData} = useAppSelector(state => state.health);
  const dispatch = useAppDispatch();

  if (
    new Date().toDateString() !==
    new Date(healthData.currentDate).toDateString()
  ) {
    storeUserHealthData(healthData, id!);
    dispatch(resetHealthData());
  }

  // effect use
  useEffect(() => {
    if (Platform.OS === 'ios') {
      // constants
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

  // effect use
  useEffect(() => {
    if (id) {
      const unsubscribe = firestore()
        .collection(firebaseDB.collections.users)
        .doc(id)
        .onSnapshot(snapshot => {
          const userData = snapshot.data() as UserFromFirebaseDb;
          if (userData) {
            updateNotificationReadStatus(
              id,
              userData.notifications.map(val => {
                if (val.isShownViaPushNotification === false) {
                  getUserData(val.userId).then(uD => {
                    setTimeout(
                      onDisplayNotification,
                      500,
                      uD.firstName + ' ' + uD.lastName + ' ' + val.message,
                    );
                  });
                  return {
                    ...val,
                    isShownViaPushNotification: true,
                  };
                }
                return {
                  ...val,
                };
              }),
            );
            dispatch(
              updateUserData({
                ...userData,
                healthData: userData.healthData.map(val => ({
                  ...val,
                  currentDate: Timestamp.fromMillis(
                    val.currentDate.seconds * 1000,
                  )
                    .toDate()
                    .toISOString(),
                })),
                notifications: userData.notifications.map(val => ({
                  ...val,
                  createdOn: Timestamp.fromMillis(val.createdOn.seconds * 1000)
                    .toDate()
                    .toISOString(),
                })),
              }),
            );
          }
        });
      return () => unsubscribe();
    }
  }, [dispatch, id]);

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
          presentation: Platform.OS === 'ios' ? 'modal' : 'containedModal',
        }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
