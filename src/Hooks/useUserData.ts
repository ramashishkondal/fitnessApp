import {useRealm, useQuery} from '@realm/react';
import {useCallback, useEffect} from 'react';
import {MealDb} from '../DbModels/mealData';
import {PostDb} from '../DbModels/post';
import {StoryDb} from '../DbModels/story';
import {UserDb} from '../DbModels/user';
import {updateUserData} from '../Redux/Reducers/currentUser';
import {onDisplayNotification} from '../Utils/commonUtils';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  storeMealData,
  firebaseDB,
  storeStory,
  storePost,
  NotificationDataFirebaseDB,
  getUserData,
  UserFromFirebaseDb,
  updateNotificationReadStatus,
} from '../Utils/userUtils';
import {useAppSelector, useAppDispatch} from '../Redux/Store';
import {useNetInfo} from '@react-native-community/netinfo';

export const useUserData = () => {
  // netInfo use
  const netInfo = useNetInfo();
  // redux use
  const {id, firstName, lastName, photo} = useAppSelector(
    state => state.User.data,
  );
  const {allowPushNotifications} = useAppSelector(state => state.settings.data);
  const dispatch = useAppDispatch();

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
            ).then(() => {
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
                    createdOn: Timestamp.fromMillis(
                      val.createdOn.seconds * 1000,
                    )
                      .toDate()
                      .toISOString(),
                  })),
                }),
              );
            });
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
};
