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
import { isValidEmail, isValidName } from "../../../Utils/checkValidity";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddFirstName = ({ navigation }: AddEmailLogInProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (firstName) {
      dispatch(updateUserData({ firstName }));
      navigation.push("AddLastName");
    }
  };
  const handleChangeText = (text: string) => {
    if (isValidName(text)) {
      setFirstName(text);
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <Text style={styles.titleText}>What is Your First Name?</Text>
      <CustomTextInput
        value={firstName}
        placeHolder={"First Name"}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
      />
      <CustomButton
        title={STRING.ADD_EMAIL.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddFirstName);
