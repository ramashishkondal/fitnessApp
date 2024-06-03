// libs
import React, { useState } from "react";
import { Text, View } from "react-native";

// custom
import {
  CustomButton,
  CustomErrorText,
  CustomTextInput,
  WithOnboarding,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";
import { AddEmailLogInProps } from "../../../Defs";
import { isValidEmail } from "../../../Utils/checkValidity";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddEmail = ({ navigation }: AddEmailLogInProps) => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (email && isValidEmail(email)) {
      dispatch(updateUserData({ email }));
      navigation.push("AddPassword");
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <Text style={styles.titleText}>{STRING.ADD_EMAIL.TITLE}</Text>
      <CustomTextInput
        placeHolder={STRING.ADD_EMAIL.TEXT_INPUT_PLACEHOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={setEmail}
        autoFocus
      />
      {email && !isValidEmail(email) ? (
        <CustomErrorText text={STRING.ADD_EMAIL.EMAIL_ERROR} />
      ) : null}
      <CustomButton
        title={STRING.ADD_EMAIL.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddEmail);
