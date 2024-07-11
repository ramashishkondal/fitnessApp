// libs
import React, {useCallback, useEffect} from 'react';
import {Platform} from 'react-native';

// 3rd party
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppleHealthKit from 'react-native-health';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
  NotificationDataFirebaseDB,
  UserFromFirebaseDb,
  firebaseDB,
  getUserData,
  storeMealData,
  storePost,
  storeStory,
  storeUserHealthData,
  updateNotificationReadStatus,
} from '../Utils/userUtils';
import {date, onDisplayNotification} from '../Utils/commonUtils';
import EditProfile from '../Screens/MainScreens/EditProfile';
import {updateUserData} from '../Redux/Reducers/currentUser';
import BackNavigator from '../Components/Molecules/BackNavigator';
import ResetPassword from '../Screens/MainScreens/ResetPassword';
import {useNetInfo} from '@react-native-community/netinfo';
import {useQuery, useRealm} from '@realm/react';
import {StoryDb} from '../DbModels/story';
import {PostDb} from '../DbModels/post';
import {UserDb} from '../DbModels/user';
import GiveFeedback from '../Screens/MainScreens/GiveFeedback';
import AboutUs from '../Screens/MainScreens/AboutUs';
import {useHealth} from '../Hooks/useHealth';
import {MealDb} from '../DbModels/mealData';

const Stack = createNativeStackNavigator<appStackParamList>();

const AppNavigator = () => {
  // net info use
  const netInfo = useNetInfo();
  // getting health data
  useHealth();

  // redux use
  const {id, firstName, lastName, photo} = useAppSelector(
    state => state.User.data,
  );
  const {value: healthData} = useAppSelector(state => state.health);
  const {allowPushNotifications} = useAppSelector(state => state.settings.data);
  const dispatch = useAppDispatch();

  if (
    new Date().setHours(0, 0, 0, 0) !==
    new Date(healthData.currentDate).setHours(0, 0, 0, 0)
  ) {
    storeUserHealthData(healthData, id!).then(() => {
      dispatch(resetHealthData());
    });
  }

  // realm use
  const realm = useRealm();
  const offlineStoryData = useQuery(StoryDb);
  const offlinePostData = useQuery(PostDb);
  const offlineUserData = useQuery(UserDb);
  const offlineMealData = useQuery(MealDb);

  const handleOfflineMealData = useCallback(async () => {
    console.log('mealData is ', offlineMealData);
    if (offlineMealData.length) {
      const {uid, ...mealData} = offlineMealData[0];
      await storeMealData(uid, {
        breakfast: mealData.breakfast.map(val => val),
        lunch: mealData.lunch.map(val => val),
        dinner: mealData.dinner.map(val => val),
        snack: mealData.snack.map(val => val),
      });
      realm.write(() => {
        realm.delete(offlineMealData);
      });
    }
  }, [offlineMealData, realm]);

  const handleOfflineUser = useCallback(async () => {
    if (offlineUserData.length) {
      const {
        firstName: fn,
        lastName: ln,
        gender,
        preferences,
        interests,
        photo: userPhoto,
        id: uuid,
      } = offlineUserData[0];

      if (userPhoto) {
        const reference = storage().ref(
          'media/' + 'profilePictures' + id + '/' + 'photo',
        );
        try {
          const url = await reference.putFile(userPhoto);
          await firestore()
            .collection(firebaseDB.collections.users)
            .doc(uuid)
            .update({
              firstName: fn,
              lastName: ln,
              gender,
              photo: url,
              preferences: preferences?.map(val => val),
              interests: interests?.map(val => val),
            });
          realm.write(() => {
            realm.delete(offlineUserData);
          });
        } catch (e) {
          console.log('error in syncing data ');
        }
      } else {
        await firestore()
          .collection(firebaseDB.collections.users)
          .doc(uuid)
          .update({
            firstName: fn,
            lastName: ln,
            gender,
            preferences: preferences?.map(val => val),
            interests: interests?.map(val => val),
          });
        realm.write(() => {
          realm.delete(offlineUserData);
        });
      }
    }
  }, [id, offlineUserData, realm]);

  const handleOfflineStory = useCallback(async () => {
    if (offlineStoryData[0].stories.length) {
      console.log('offline story data', offlineStoryData);
      offlineStoryData[0].stories.forEach(val => {
        storeStory(
          {
            storyType: val.storyType,
            storyUrl: val.storyUrl,
            userName: firstName + ' ' + lastName,
            userPhoto: photo,
          },
          id!,
        );
      });
      realm.write(() => {
        realm.delete(offlineStoryData);
      });
      console.log('deleted story data and added it to firestore');
    }
  }, [firstName, id, lastName, offlineStoryData, photo, realm]);

  const handleOfflinePost = useCallback(async () => {
    console.log('offline post data', offlinePostData);
    offlinePostData.forEach(val => {
      storePost({
        caption: val.caption,
        comments: [],
        createdOn: Timestamp.fromDate(new Date()),
        likedByUsersId: [],
        photo: val.photo,
        userId: id!,
        userName: firstName + ' ' + lastName,
        userPhoto: photo,
      });
    });
    realm.write(() => {
      realm.delete(offlinePostData);
    });
  }, [firstName, id, lastName, offlinePostData, photo, realm]);

  const handleGetUserData = useCallback(async () => {
    if (id) {
      const handleNotifications = (val: NotificationDataFirebaseDB) => {
        if (val.isShownViaPushNotification === false) {
          if (allowPushNotifications) {
            getUserData(val.userId).then(uD => {
              setTimeout(
                onDisplayNotification,
                500,
                uD.firstName + ' ' + uD.lastName + ' ' + val.message,
              );
            });
          }
          return {
            ...val,
            isShownViaPushNotification: true,
          };
        }
        return {
          ...val,
        };
      };

      const unsubscribe = firestore()
        .collection(firebaseDB.collections.users)
        .doc(id)
        .onSnapshot(snapshot => {
          const userData = snapshot.data() as UserFromFirebaseDb;
          if (userData) {
            // notifications
            updateNotificationReadStatus(
              id,
              userData.notifications.map(handleNotifications),
            );
            console.log('seconds ', userData);
            dispatch(
              updateUserData({
                ...userData,
                createdOn: Timestamp.fromMillis(
                  userData.createdOn.seconds * 1000,
                )
                  .toDate()
                  .toISOString(),
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
  }, [allowPushNotifications, dispatch, id]);

  // effect use
  useEffect(() => {
    if (netInfo.isConnected) {
      const handleUserData = async () => {
        if (offlineUserData.length) {
          await handleOfflineUser();
        }
        if (offlineMealData.length) {
          handleOfflineMealData();
        }
        if (offlinePostData.length) {
          await handleOfflinePost();
        }
        if (offlineStoryData.length) {
          await handleOfflineStory();
        }
        await handleGetUserData();
      };
      handleUserData();
    }
  }, [
    handleGetUserData,
    handleOfflineMealData,
    handleOfflinePost,
    handleOfflineStory,
    handleOfflineUser,
    netInfo.isConnected,
    offlineMealData.length,
    offlinePostData.length,
    offlineStoryData.length,
    offlineUserData.length,
  ]);

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
