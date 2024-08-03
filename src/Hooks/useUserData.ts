import {useRealm} from '@realm/react';
import {useCallback, useEffect} from 'react';
import {UserDb} from '../DbModels/user';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {firebaseDB, UserFromFirebaseDb} from '../Utils/userUtils';
import {useAppDispatch, useAppSelector} from '../Redux/Store';
import {UpdateMode} from 'realm';
import {useNetInfo} from '@react-native-community/netinfo';
import {updateUserData} from '../Redux/Reducers/currentUser';
import {User} from '../Defs';

export const useUserData = () => {
  // redux use
  const {id} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // realm use
  const realm = useRealm();

  // netInfo use
  const netInfo = useNetInfo();

  const addUser = useCallback(
    (user: User) => {
      realm.write(() => {
        realm.create(
          UserDb,
          {
            id: user.id!,
            email: user.email,
            photo: user.photo,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            preferences: user.preferences,
            interests: user.interests,
            storiesWatched: user.storiesWatched,
            notifications: user.notifications,
            createdOn: user.createdOn,
            syncStatus: 'synced',
          },
          UpdateMode.Modified,
        );
      });
    },
    [realm],
  );

  const getUser = useCallback(() => {
    console.log(
      'user data from realm is ',
      realm.objectForPrimaryKey(UserDb, id),
    );
    return realm.objectForPrimaryKey(UserDb, id);
  }, [realm, id]);

  const syncData = useCallback(async () => {
    if (id) {
      const offlineUserData = getUser();
      if (offlineUserData) {
        if (offlineUserData.syncStatus !== 'synced') {
          console.log(
            'adding modified data to the firebaseDb',
            offlineUserData,
          );
          await firestore()
            .collection(firebaseDB.collections.users)
            .doc(id)
            .update({
              firstName: offlineUserData.firstName,
              lastName: offlineUserData.lastName,
              photo: offlineUserData.photo,
              gender: offlineUserData.gender,
              preferences: offlineUserData.preferences.map(val => val),
              interests: offlineUserData.interests.map(val => val),
              storiesWatched: offlineUserData.storiesWatched.map(val => val),
              notifications: offlineUserData.notifications.map(val => ({
                ...val,
                createdOn: Timestamp.fromDate(new Date(val.createdOn)),
              })),
            });

          realm.write(() => {
            offlineUserData.syncStatus = 'synced';
          });
        }
      }
    }
  }, [getUser, id, realm]);

  const getUserDataFromFirebase = useCallback(async () => {
    if (id) {
      const unsubscribe = firestore()
        .collection(firebaseDB.collections.users)
        .doc(id)
        .onSnapshot(snapshot => {
          const userData = snapshot.data() as UserFromFirebaseDb;
          console.log('firebaseDb ', userData);
          const parsedUserData = {
            ...userData,
            notifications: userData.notifications.map(val => ({
              ...val,
              createdOn: Timestamp.fromMillis(val.createdOn.seconds * 1000)
                .toDate()
                .toISOString(),
            })),
            createdOn: Timestamp.fromMillis(userData.createdOn.seconds * 1000)
              .toDate()
              .toISOString(),
          };
          addUser(parsedUserData);
          dispatch(updateUserData(parsedUserData));
        });

      return unsubscribe;
    }
  }, [addUser, dispatch, id]);

  const handleUserData = useCallback(async () => {
    if (netInfo.isConnected) {
      await syncData();
    }
    return await getUserDataFromFirebase();
  }, [getUserDataFromFirebase, netInfo.isConnected, syncData]);

  useEffect(() => {
    const unsubscribe = handleUserData();

    return () => {
      unsubscribe?.then(unsub => unsub && unsub());
    };
  }, [handleUserData]);
};
