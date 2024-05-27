// libs
import React, { useState } from "react";
import { Text, View } from "react-native";

// custom
import {
  WithOnboarding,
  CustomButton,
  CustomTextInput,
  SocialLogins,
} from "../../../Components";
import { STRING, ICONS, SPACING } from "../../../Constants";
import { styles } from "./styles";

const emailRegex = /^[\w-.]+@([\w-]+.)+[\w]{1,}$/;
const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={styles.parent}>
      <CustomTextInput
        placeHolder={STRING.SIGNIN.EMAIL}
        icon={ICONS.User({ width: 18, height: 18 })}
        parentStyle={[SPACING.mt5, styles.textInput]}
        onChangeText={setEmail}
      />
      {email && !RegExp(emailRegex).exec(email) ? <Text>Error</Text> : null}
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
      />
    </View>
  );
};

export default WithOnboarding(SignIn);
