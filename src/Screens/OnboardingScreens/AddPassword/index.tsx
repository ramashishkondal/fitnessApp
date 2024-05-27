// libs
import React, { useState } from "react";
import { styles } from "./styles";
import { Text, View } from "react-native";

// custom
import {
  CustomButton,
  CustomTextInput,
  PasswordChecks,
  WithOnboarding,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";

const AddPassword = () => {
  const [password, setPassword] = useState("");
  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh2]}>
      <View style={styles.titleCtr}>
        <Text style={styles.titleText}>{STRING.ADD_PASSWORD.TITLE}</Text>
      </View>
      <CustomTextInput
        placeHolder={STRING.ADD_PASSWORD.TEXT_INPUT_PLACEHOLDER}
        parentStyle={[[SPACING.mtMedium, SPACING.mh1]]}
        textInputStyle={styles.textInput}
        onChangeText={setPassword}
      />
      <PasswordChecks
        lengthCheck={password.length >= 8}
        caseCheck={RegExp(/[A-Z]/).test(password)}
        numberCheck={RegExp(/[0-9]/).test(password)}
      />
      <CustomButton
        title={STRING.ADD_PASSWORD.BUTTON_TEXT}
        parentStyle={SPACING.mtLarge}
      />
    </View>
  );
};

export default WithOnboarding(AddPassword);
