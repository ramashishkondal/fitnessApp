import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, { Timestamp } from "@react-native-firebase/firestore";
import "react-native-get-random-values";
import storage from "@react-native-firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { HealthData, User } from "../Defs";

export const firebaseDB = {
  collections: {
    users: "users",
    posts: "posts",
  },
  documents: {
    users: {
      byId: "byId",
      allIds: "allIds",
    },
    posts: {
      allIds: "allIds",
    },
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
  userCredential: FirebaseAuthTypes.UserCredential
) => {
  try {
    console.log(user);
    await firestore()
      .collection("users")
      .doc("byId")
      .update({
        [userCredential.user.uid]: user,
      });
    await firestore()
      .collection(firebaseDB.collections.users)
      .doc(firebaseDB.documents.users.allIds)
      .update({
        ids: firestore.FieldValue.arrayUnion(userCredential.user.uid),
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

export type Post = {
  photo: string;
  caption: string;
  createdOn: Timestamp;
  userId: string;
  userName: string;
  userPhoto: string;
  likedByUsersId: Array<string>;
  noOfComments: number;
  postId?: string;
};

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

export const getAllPost = async () => {
  try {
    const snapshot = await firestore()
      .collection(firebaseDB.collections.posts)
      .get();
    const data = snapshot.docs;
    return data.map((val) => val.data()) as Post[];
  } catch {}
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
