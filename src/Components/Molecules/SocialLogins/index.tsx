// libs
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

// 3rd party
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// custom
import { useAppDispatch } from "../../../Redux/Store";
import { SPACING, ICONS, COLORS } from "../../../Constants";
import CustomLoading from "../../Atoms/CustomLoading";
import { updateUserData } from "../../../Redux/Reducers/currentUser";
import { storeUserData } from "../../../Utils/userUtils";
import { styles } from "./styles";

const iconSize = 17;

GoogleSignin.configure({
  webClientId:
    "330526479136-sqf4ju2hq123ofkr2nak9hhc7ctg63gv.apps.googleusercontent.com",
});

const googleSignIn = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    //TODO handle promise rejection of google sing in.
    console.log("error e ", e);
  }
};

const SocialLogins: React.FC = () => {
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const userData = await googleSignIn();
    if (userData?.additionalUserInfo?.isNewUser) {
      const { email, displayName, photoURL: photo, uid: id } = userData.user;
      if (email !== null && photo !== null) {
        dispatch(
          updateUserData({
            email,
            firstName: displayName?.split(" ")[0],
            lastName: displayName?.split(" ")[1],
            photo,
            id,
          })
        );
        storeUserData(
          {
            email,
            firstName: displayName?.split(" ")[0] ?? "",
            lastName: displayName?.split(" ")[1] ?? "",
            photo,
            id,
            finger: false,
            gender: null,
            interests: [],
            preferences: [],
            healthData: [],
            notifications: [],
            storiesWatched: [],
          },
          id
        );
      }
    }
    setIsLoading(false);
  };

  return (
    <View style={[styles.logoCtr, SPACING.mt3]}>
      <TouchableOpacity style={styles.logos}>
        {ICONS.TwitterLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos}>
        {ICONS.FacebookLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos} onPress={handleGoogleSignIn}>
        {isLoading ? (
          <CustomLoading color={COLORS.PRIMARY.PURPLE} />
        ) : (
          ICONS.GoogleLogo({
            width: iconSize,
            height: iconSize,
            color: "#4E4BC7",
          })
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogins;
