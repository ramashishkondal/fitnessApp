import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore, {Timestamp} from '@react-native-firebase/firestore';
import 'react-native-get-random-values';
import storage from '@react-native-firebase/storage';
import {v4 as uuidv4} from 'uuid';
import {HealthData, User, Post, Comment} from '../Defs';
import {NotificationData} from '../Defs/user';

export const firebaseDB = {
  collections: {
    users: 'users',
    posts: 'posts',
    stories: 'stories',
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

export const storeUserData = async (
  user: User,
  userId: FirebaseAuthTypes.UserCredential['user']['uid'],
) => {
  try {
    await firestore().collection('users').doc(userId).set(user);
    console.log('User added!');
  } catch (e) {
    console.log('error storing User data - ', e);
  }
};

export const storeUserHealthData = async (
  healthData: HealthData,
  uid: FirebaseAuthTypes.UserCredential['user']['uid'],
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(uid)
      .update({
        healthData: firestore.FieldValue.arrayUnion(healthData),
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
    return snapshot.data() as Array<HealthData>;
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

  return snapshot.data() as User;
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

export const storePostComment = async (
  postId: string,
  comment: Comment,
  notification: {sendNotificationToUserId: string},
) => {
  await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .update({
      comments: firestore.FieldValue.arrayUnion(comment),
    });
  sendNotification(
    {
      createdOn: comment.createdOn,
      isShownViaPushNotification: false,
      isUnread: true,
      message: 'commented on your post',
      userId: comment.userId,
    },
    notification.sendNotificationToUserId,
  );
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
    await sendNotification(
      {
        createdOn: Timestamp.fromDate(new Date()),
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
  stories: [{storyUrl: string; storyType: string}];
  userName: string;
  userPhoto: string;
  storyByUserId: string;
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
          }),
          userName: story.userName,
          userPhoto: story.userPhoto,
          storyByUserId: userId,
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
        });
    }
    const snap = await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .get();
    const storiesWatchedData = snap.get('storiesWatched') as Array<string>;
    firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        storiesWatched: storiesWatchedData.filter(val => val !== userId),
      });
  } catch (e) {
    console.log('error posting story', e);
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

export const sendNotification = async (
  notification: NotificationData,
  sendToUserId: string,
) => {
  try {
    console.log('notification sent to ', sendToUserId);
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(sendToUserId)
      .update({
        notifications: firestore.FieldValue.arrayUnion(notification),
      });
  } catch (e) {
    console.log('error with sending notifications ', e);
  }
};

export const updateNotificationReadStatus = async (
  userId: string,
  newNotificationArray: Array<NotificationData>,
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        notifications: newNotificationArray,
      });
    console.log('notifications read status updated to ', newNotificationArray);
  } catch (e) {
    console.log('error with getting stories ', e);
  }
};

export const updateStoriesWatchedArray = async (
  userId: string,
  storyByUserId: string,
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(userId)
      .update({
        storiesWatched: firestore.FieldValue.arrayUnion(storyByUserId),
      });
  } catch (e) {
    console.log('error encountered while updating watched stories array -', e);
  }
};
