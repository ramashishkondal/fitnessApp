// libs
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

// 3rd party
import auth from "@react-native-firebase/auth";

// custom
import {
  CustomTextInput,
  CustomErrorText,
  CustomButton,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";
import { isValidEmail } from "../../../Utils/checkValidity";
import { ForgotPasswordProps } from "../../../Defs/navigators";
import { styles } from "./styles";

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  // state use
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // functions
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("Reset Email sent to mail", email, [
        { text: "Ok", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch (e) {
      console.log("error - ", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.parent}>
      <View style={[styles.child, SPACING.mt5, SPACING.mh1]}>
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
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;
