// libs
import React, { useState } from "react";
import { Alert, View } from "react-native";

// custom
import {
  CustomButton,
  CustomTextInput,
  WithOnboarding,
  HeadingText,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";
import { AddEmailLogInProps } from "../../../Defs";
import { isValidName } from "../../../Utils/checkValidity";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddFirstName: React.FC<AddEmailLogInProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (firstName) {
      dispatch(updateUserData({ firstName }));
      navigation.push("AddLastName");
    } else {
      Alert.alert("Error", "First name cant be empty!");
    }
  };
  const handleChangeText = (text: string) => {
    if (isValidName(text)) {
      setFirstName(text);
    }
  };

  return (
    <View style={[styles.parent, SPACING.mt5, SPACING.mh1]}>
      <HeadingText text={STRING.ADD_FIRST_NAME.TITLE} />
      <CustomTextInput
        value={firstName}
        placeHolder={STRING.ADD_FIRST_NAME.TEXT_INPUT_PLACE_HOLDER}
        parentStyle={[SPACING.mh2, SPACING.mt5]}
        textInputStyle={styles.textInput}
        onChangeText={handleChangeText}
        autoFocus
      />
      <CustomButton
        title={STRING.ADD_FIRST_NAME.BUTTON_TEXT}
        parentStyle={SPACING.mtXLarge}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default WithOnboarding(AddFirstName);
