import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { User } from "../Defs";

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
      .collection("users")
      .doc("allIds")
      .update({
        ids: firestore.FieldValue.arrayUnion(userCredential.user.uid),
      });
    console.log("User added!");
  } catch (e) {
    console.log("error storing User data - ", e);
  }
};
