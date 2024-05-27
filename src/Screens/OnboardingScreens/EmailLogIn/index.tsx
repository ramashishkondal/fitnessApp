import React, { useState } from "react";
import { Text, View } from "react-native";
import { SPACING, STRING } from "../../../Constants";
import {
  CustomButton,
  CustomTextInput,
  WithOnboarding,
} from "../../../Components";
import { EmailLogInProps } from "../../../Defs";
import { styles } from "./styles";

const emailRegex = /^[\w-.]+@([\w-]+.)+[\w]{1,}$/;
const EmailLogIn = ({ navigation }: EmailLogInProps) => {
  const [email, setEmail] = useState<string>("");

  const goToAddPassword = () => {
    if (email && RegExp(emailRegex).exec(email)) {
      navigation.push("AddPassword");
    }
  };
  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <Text style={styles.titleText}>{STRING.EMAIL_LOG_IN.TITLE}</Text>
      <CustomTextInput
        placeHolder={STRING.EMAIL_LOG_IN.TEXT_INPUT_PLACEHOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={setEmail}
      />
      {email && !RegExp(emailRegex).exec(email) ? <Text>Error</Text> : null}
      <CustomButton
        title={STRING.EMAIL_LOG_IN.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={goToAddPassword}
      />
    </View>
  );
};

export default WithOnboarding(EmailLogIn);
