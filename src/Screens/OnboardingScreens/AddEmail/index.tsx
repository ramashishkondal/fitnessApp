// libs
import React, { useState } from "react";
import { Text, View } from "react-native";

// custom
import {
  CustomButton,
  CustomTextInput,
  WithOnboarding,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";
import { AddEmailLogInProps } from "../../../Defs";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateNewUser } from "../../../Redux/Reducers/newUser";
import { isValidEmail } from "../../../Utils/checkValidity";

const EmailLogIn = ({ navigation }: AddEmailLogInProps) => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();

  const goToAddPassword = () => {
    if (email && isValidEmail(email)) {
      dispatch(updateNewUser({ email }));
      navigation.push("AddPassword", { email: email });
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
        autoFocus
        hasError={!!email && !isValidEmail(email)}
      />
      {email && !isValidEmail(email) ? <Text>Error</Text> : null}
      <CustomButton
        title={STRING.EMAIL_LOG_IN.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={goToAddPassword}
      />
    </View>
  );
};

export default WithOnboarding(EmailLogIn);
