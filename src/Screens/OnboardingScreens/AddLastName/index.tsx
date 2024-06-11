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
import { isValidName } from "../../../Utils/checkValidity";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddLastName = ({ navigation }: AddEmailLogInProps) => {
  const [lastName, setLastName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (lastName) {
      dispatch(updateUserData({ lastName }));
      navigation.push("AddFingerprint");
    }
  };
  const handleChangeText = (text: string) => {
    if (isValidName(text)) {
      setLastName(text);
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <Text style={styles.titleText}>{STRING.ADD_LAST_NAME.TITLE}</Text>
      <CustomTextInput
        value={lastName}
        placeHolder={STRING.ADD_LAST_NAME.TEXT_INPUT_PLACE_HOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
      />
      <CustomButton
        title={STRING.ADD_LAST_NAME.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddLastName);
