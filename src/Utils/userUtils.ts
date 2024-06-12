import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import storage from "@react-native-firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { HealthData, User, Post, Comment } from "../Defs";

export const firebaseDB = {
  collections: {
    users: "users",
    posts: "posts",
    stories: "stories",
  },
  documents: {
    users: {
      byId: "byId",
      allIds: "allIds",
    },
    posts: {
      allIds: "allIds",
    },
    stories: {},
  },
};

// user
export const createUser = async (email: string, password: string) => {
  try {
    const userCredential: FirebaseAuthTypes.UserCredential = await auth().createUserWithEmailAndPassword(
      email,
      password
    );
    return userCredential;
  } catch (e) {
    console.log("error creating user", e);
  }
};

export const storeUserData = async (
  user: User,
  userId: FirebaseAuthTypes.UserCredential["user"]["uid"]
) => {
  try {
    await firestore()
      .collection("users")
      .doc("byId")
      .update({
        [userId]: user,
      });
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(firebaseDB.documents.users.allIds)
      .update({
        ids: firestore.FieldValue.arrayUnion(userId),
      });
    console.log("User added!");
  } catch (e) {
    console.log("error storing User data - ", e);
  }
};

export const storeUserHealthData = async (
  healthData: HealthData,
  uid: FirebaseAuthTypes.UserCredential["user"]["uid"]
) => {
  try {
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(firebaseDB.documents.users.byId)
      .update({
        [uid + ".healthData"]: firestore.FieldValue.arrayUnion(healthData),
      });
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async (
  uid: FirebaseAuthTypes.UserCredential["user"]["uid"]
) => {
  const snapshot = await firestore()
    .collection(firebaseDB.collections.users)
    .doc(firebaseDB.documents.users.byId)
    .get();
  const userData = snapshot.get(uid);
  console.log(userData);
  return userData as User;
};

// posts
export const storePost = async (post: Post) => {
  try {
    const newPostId = post.postId ?? uuidv4();
    const reference = storage().ref(
      "media/" + "posts/" + newPostId + "/" + "photo"
    );
    await reference.putFile(post.photo);
    const url = await reference.getDownloadURL();
    await firestore()
      .collection(firebaseDB.collections.posts)
      .doc(newPostId)
      .set({ ...post, postId: newPostId, photo: url });
  } catch (e) {
    console.log(e);
  }
};

export const storePostComment = async (postId: string, comment: Comment) => {
  await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .update({
      comments: firestore.FieldValue.arrayUnion(comment),
    });
};

export const getPost = async (postId: string) => {
  const snapshot = await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .get();
  console.log("post data", snapshot.data());
  return snapshot.data();
};

export const getAllPost = async () => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.posts)
      .get();
    const data = snapshot.docs;
    return data.map((val) => val.data()) as Post[];
  } catch (e) {
    console.log("error with getting posts ", e);
  }
};

export const addLikes = async (
  postId: string,
  likedByUsersId: Array<string>
) => {
  await firestore()
    .collection(firebaseDB.collections.posts)
    .doc(postId)
    .update({
      likedByUsersId: likedByUsersId,
    });
};

// story

type Story = {
  id?: string;
  storyUrl: string;
  userName: string;
  userPhoto: string;
};

export const storeStory = async (story: Story) => {
  try {
    const newStoryId = story.id ?? uuidv4();
    const reference = storage().ref(
      "media/" + "stories/" + newStoryId + "/" + "photo"
    );
    await reference.putFile(story.storyUrl);
    const url = await reference.getDownloadURL();

    await firestore()
      .collection(firebaseDB.collections.stories)
      .doc(newStoryId)
      .set({
        ...story,
        id: newStoryId,
        storyUrl: url,
      });
  } catch (e) {
    console.log("error posting story", e);
  }
};

export const getAllStoriesData = async () => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.stories)
      .get();
    const data = snapshot.docs;
    return data.map((val) => val.data()) as Story[];
  } catch (e) {
    console.log("error with getting stories ", e);
  }
};
