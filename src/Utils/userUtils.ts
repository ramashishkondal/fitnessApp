import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { HealthData, User } from "../Defs";

export const firebaseDB = {
  collections: {
    users: "users",
  },
  documents: {
    users: {
      byId: "byId",
      allIds: "allIds",
    },
  },
};

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
      .doc(firebaseDB.documents.users.byId)
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
  console.log();
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
  return userData;
};
