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
import { isValidPassword } from "../../../Utils/checkValidity";
import { AddPasswordProps } from "../../../Defs";
import { useAppDispatch } from "../../../Redux/Store";
import { updateNewUser } from "../../../Redux/Reducers/newUser";

const AddPassword = ({ navigation }: AddPasswordProps) => {
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (isValidPassword.checkAll(password)) {
      dispatch(updateNewUser({ password }));
      navigation.push("AddFingerprint");
    }
  };

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
        autoFocus
      />
      <PasswordChecks
        lengthCheck={isValidPassword.lengthCheck(password)}
        caseCheck={isValidPassword.caseCheck(password)}
        numberCheck={isValidPassword.numberCheck(password)}
      />
      <CustomButton
        title={STRING.ADD_PASSWORD.BUTTON_TEXT}
        parentStyle={SPACING.mtLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddPassword);
