import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {HealthData, User, Post, Comment} from '../Defs';
import {NotificationData} from '../Defs/user';
import {debounce} from './commonUtils';
import {DailyMeals} from '../Redux/Reducers/dailyMeal';

export const firebaseDB = {
  collections: {
    users: 'users',
    posts: 'posts',
    stories: 'stories',
    dailyMeals: 'dailyMeals',
    healthData: 'healthData',
  },
  documents: {
    users: {},
    posts: {
      allIds: 'allIds',
    },
    stories: {},
  },
};

// user
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    return userCredential;
  } catch (e) {
    console.log('error creating user', e);
  }
};

export type UserFromFirebaseDb = Omit<
  Omit<Omit<User, 'createdOn'>, 'notifications'>,
  'healthData'
> & {
  createdOn: Timestamp;
  notifications: Array<NotificationDataFirebaseDB>;
  healthData: Array<Omit<HealthData, 'currentDate'> & {currentDate: Timestamp}>;
};
export const storeUserData = async (
  user: Omit<User, 'createdOn'>,
  userId: FirebaseAuthTypes.UserCredential['user']['uid'],
) => {
  try {
    const userDataToSend: Omit<User, 'createdOn'> & {
      createdOn: Timestamp;
    } = {
      ...user,
      createdOn: Timestamp.fromDate(new Date()),
    };
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .set(userDataToSend);
    await firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(userId)
      .set({
        [new Date().setHours(0, 0, 0, 0).toString()]: {
          currentDate: new Date().toISOString(),
          waterIntake: 0,
          goal: {
            noOfGlasses: 6,
            totalCalorie: 8000,
            totalSteps: 10000,
          },
        },
      });
    console.log('User added!');
  } catch (e) {
    console.log('error storing User data - ', e);
  }
};

export type UserHealthDataFirebaseDb = Omit<HealthData, 'currentDate'> & {
  currentDate: Timestamp;
};
export const storeUserHealthData = async (
  healthData: HealthData,
  uid: FirebaseAuthTypes.UserCredential['user']['uid'],
) => {
  try {
    const sendHealthData: UserHealthDataFirebaseDb = {
      ...healthData,
      currentDate: Timestamp.fromDate(new Date()),
    };
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(uid)
      .update({
        healthData: firestore.FieldValue.arrayUnion(sendHealthData),
      });
  } catch (e) {
    console.log(e);
  }
};

export const getHealthData = async (uid: string) => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.users)
      .doc(uid)
      .get();
    return snapshot.get('healthData');
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async (
  uid: FirebaseAuthTypes.UserCredential['user']['uid'],
) => {
  const snapshot = await firestore()
    .collection(firebaseDB.collections.users)
    .doc(uid)
    .get();

  return snapshot.data() as UserFromFirebaseDb;
};

// posts
export const storePost = async (post: Post) => {
  try {
    const newPostId = post.postId ?? uuidv4();
    const reference = storage().ref(
      'media/' + 'posts/' + newPostId + '/' + 'photo',
    );
    await reference.putFile(post.photo);
    const url = await reference.getDownloadURL();
    await firestore()
      .collection(firebaseDB.collections.posts)
      .doc(newPostId)
      .set({...post, postId: newPostId, photo: url});
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async (postId: Post['postId']) => {
  console.log('post id ', postId);
  try {
    await firestore()
      .collection(firebaseDB.collections.posts)
      .doc(postId)
      .delete();
  } catch (error) {
    console.log('error with deleting post', error);
  }
};

export const storePostComment = async (
  postId: string,
  comment: Comment,
  notification?: {sendNotificationToUserId: string},
) => {
  await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .update({
      comments: firestore.FieldValue.arrayUnion(comment),
    });
  if (notification) {
    sendNotification(
      {
        isShownViaPushNotification: false,
        isUnread: true,
        message: 'commented on your post',
        userId: comment.userId,
      },
      notification.sendNotificationToUserId,
    );
  }
};

export const getPost = async (postId: string) => {
  const snapshot = await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .get();
  console.log('post data', snapshot.data());
  return snapshot.data();
};

export const getAllPost = async () => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.posts)
      .get();
    const data = snapshot.docs;
    return data.map(val => val.data()) as Post[];
  } catch (e) {
    console.log('error with getting posts ', e);
  }
};
// add likes

export const addLikes = async (
  userId: string,
  postId: string,
  likedByUsersId: Array<string>,
  notification?: {
    sendNotificationToUserId: string;
    userName: string;
    userPhoto: string;
  },
) => {
  await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .update({
      likedByUsersId: likedByUsersId,
    });
  console.log(notification);
  if (notification && userId !== notification.sendNotificationToUserId) {
    console.log('this ran');
    debouncedNotification(
      {
        message: 'liked your post.',
        userId,
        isUnread: true,
        isShownViaPushNotification: false,
      },
      notification.sendNotificationToUserId,
    );
  }
};

// story

export type StoryData = {
  stories: {storyUrl: string; storyType: string; storyCreatedOn: string}[];
  userName: string;
  userPhoto: string;
  storyByUserId: string;
  latestStoryOn: Timestamp;
};

export const storeStory = async (
  story: {
    storyUrl: string;
    storyType: string;
    userName: string;
    userPhoto: string;
  },
  userId: string,
) => {
  try {
    const storyId = uuidv4();
    const reference = storage().ref(
      'media/' + 'stories/' + userId + '/' + storyId,
    );
    await reference.putFile(story.storyUrl);
    const url = await reference.getDownloadURL();

    const val = await firestore()
      .collection(firebaseDB.collections.stories)
      .doc(userId)
      .get();
    const userStoryData = val.data() as StoryData;

    if (userStoryData) {
      await firestore()
        .collection(firebaseDB.collections.stories)
        .doc(userId)
        .set({
          stories: userStoryData.stories.concat({
            storyType: story.storyType,
            storyUrl: url,
            storyCreatedOn: new Date().toISOString(),
          }),
          userName: story.userName,
          userPhoto: story.userPhoto,
          storyByUserId: userId,
          latestStoryOn: Timestamp.fromDate(new Date()),
        });
    } else {
      await firestore()
        .collection(firebaseDB.collections.stories)
        .doc(userId)
        .set({
          stories: [
            {
              storyType: story.storyType,
              storyUrl: url,
            },
          ],
          userName: story.userName,
          userPhoto: story.userPhoto,
          storyByUserId: userId,
          latestStoryOn: Timestamp.fromDate(new Date()),
        });
    }
    const snap = await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .get();
    const storiesWatchedData: Array<string> = snap.get('storiesWatched');
    firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        storiesWatched: storiesWatchedData.filter(v => v !== userId),
      });
  } catch (e) {
    console.log('error posting story', e);
  }
};

export const storeBiometricData = async (
  biometric: boolean,
  userId: string,
) => {
  try {
    console.log('awdawdaw', biometric, userId);
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        finger: biometric,
      });
  } catch (e) {
    console.log('error with adding biometric data', e);
  }
};

export const deleteStoryByUpdatingArray = async (
  storyByUserId: string,
  storiesArray: StoryData['stories'],
) => {
  try {
    if (storiesArray.length === 0) {
      await firestore()
        .collection(firebaseDB.collections.stories)
        .doc(storyByUserId)
        .delete();
      return;
    }
    await firestore()
      .collection(firebaseDB.collections.stories)
      .doc(storyByUserId)
      .update({
        stories: storiesArray,
      });
  } catch (e) {
    console.log('error with deleting story', e);
  }
};

export const getAllStoriesData = async () => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.stories)
      .get();
    const data = snapshot.docs;
    return data.map(val => val.data()) as StoryData[][];
  } catch (e) {
    console.log('error with getting stories ', e);
  }
};

export type NotificationDataFirebaseDB = Omit<NotificationData, 'createdOn'> & {
  createdOn: Timestamp;
};
export const sendNotification = async (
  notification: Omit<NotificationData, 'createdOn'>,
  sendToUserId: string,
) => {
  try {
    console.log('notification sent to ', sendToUserId);

    const notificationToSend: NotificationDataFirebaseDB = {
      ...notification,
      createdOn: Timestamp.fromDate(new Date()),
    };

    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(sendToUserId)
      .update({
        notifications: firestore.FieldValue.arrayUnion(notificationToSend),
      });
  } catch (e) {
    console.log('error with sending notifications ', e);
  }
};
const debouncedNotification = debounce(sendNotification, 100);

export const updateNotificationReadStatus = async (
  userId: string,
  newNotificationArray: Array<NotificationDataFirebaseDB>,
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        notifications: newNotificationArray,
      });
  } catch (e) {
    console.log('error with getting stories ', e);
  }
};

export const updateStoriesWatchedArray = async (
  userId: string,
  storyByUserId: string,
  latestStoryAt: string,
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        storiesWatched: firestore.FieldValue.arrayUnion(
          storyByUserId + ' ' + latestStoryAt,
        ),
      });
  } catch (e) {
    console.log('error encountered while updating watched stories array -', e);
  }
};

export const storeMealData = async (userId: string, dailyMeals: DailyMeals) => {
  const updateAt = new Date().setHours(0, 0, 0, 0).toString();
  await firestore()
    .collection(firebaseDB.collections.dailyMeals)
    .doc(userId)
    .set({[updateAt]: dailyMeals});
};

export const getMealData = async (userId: string) => {
  const val = await firestore()
    .collection(firebaseDB.collections.dailyMeals)
    .doc(userId)
    .get();
  return val.data() as DailyMeals;
};

export const storeNewUserHealthData = async (
  userId: string,
  healthData: HealthData,
) => {
  console.log(
    'storing new health data ran',
    new Date().setHours(0, 0, 0, 0).toString(),
  );
  const updateAt = new Date().setHours(0, 0, 0, 0).toString();
  try {
    await firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(userId)
      .set({
        [updateAt]: healthData,
      });
  } catch (e) {
    console.log('errror storing new health data', e);
  }
};

export const updateWaterIntake = async (
  userId: string,
  waterIntake: HealthData['waterIntake'],
  goal: HealthData['goal'],
) => {
  try {
    const updateAt = new Date().setHours(0, 0, 0, 0).toString();
    await firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(userId)
      .update({
        [updateAt + '.waterIntake']: waterIntake,
        [updateAt + '.goal']: goal,
        [updateAt + '.currentDate']: new Date().toISOString(),
      });
  } catch (e) {
    console.log('errror storing new health data', e);
  }
};

// healthData -> id -> date -> {HealthData}
//
//
