import React from "react";
import { TouchableOpacity, View } from "react-native";
import { SPACING, ICONS } from "../../Constants";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { styles } from "./styles";
const iconSize = 17;

GoogleSignin.configure({
  webClientId:
    "330526479136-sqf4ju2hq123ofkr2nak9hhc7ctg63gv.apps.googleusercontent.com",
});

const googleSignIn = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);

  //TODO handle promise rejection of google sing in.
};

const SocialLogins = () => {
  return (
    <View style={[styles.logoCtr, SPACING.mt3]}>
      <TouchableOpacity style={styles.logos}>
        {ICONS.TwitterLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos}>
        {ICONS.FacebookLogo({ width: iconSize, height: iconSize })}
      </TouchableOpacity>
      <TouchableOpacity style={styles.logos} onPress={googleSignIn}>
        {ICONS.GoogleLogo({
          width: iconSize,
          height: iconSize,
          color: "#4E4BC7",
        })}
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogins;
