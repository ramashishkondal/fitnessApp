// libs
import React, { useState } from "react";
import { Text, View } from "react-native";
import auth from "@react-native-firebase/auth";

// custom
import {
  WithOnboarding,
  CustomButton,
  CustomTextInput,
  SocialLogins,
  CustomErrorText,
} from "../../../Components";
import { STRING, ICONS, SPACING } from "../../../Constants";
import { styles } from "./styles";
import { isValidEmail } from "../../../Utils/checkValidity";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log("error with sign in ", e);
    }
  };

  return (
    <View style={styles.parent}>
      <CustomTextInput
        placeHolder={STRING.SIGNIN.EMAIL}
        icon={ICONS.User({ width: 18, height: 18 })}
        parentStyle={[SPACING.mt5, styles.textInput]}
        onChangeText={setEmail}
        autoFocus
      />
      {email && !isValidEmail(email) ? <CustomErrorText text="Error" /> : null}
      <CustomTextInput
        placeHolder={STRING.SIGNIN.PASSWORD}
        icon={ICONS.Lock({ width: 18, height: 18 })}
        parentStyle={[SPACING.mt3, styles.textInput]}
        onChangeText={setPassword}
      />
      <Text style={[styles.text, SPACING.mtMedium]}>
        {STRING.SIGNIN.SIGN_IN_WITH}
      </Text>
      <SocialLogins />
      <CustomButton
        title={STRING.SIGNIN.BUTTON_TEXT}
        parentStyle={styles.customButtonParent}
        onPress={handleSignIn}
      />
    </View>
  );
};

export default WithOnboarding(SignIn);
