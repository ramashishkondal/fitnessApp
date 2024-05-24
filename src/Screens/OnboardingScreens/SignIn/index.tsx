import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import WithOnboarding from "../../../Components/WithOnboarding";
import CustomTextInput from "../../../Components/CustomTextInput";
import { STRING } from "../../../Constants/strings";
import { ICONS } from "../../../Constants/icons";
import { SPACING } from "../../../Constants/commonStyles";

const SignIn = WithOnboarding(() => {
  return (
    <View style={styles.parent}>
      <CustomTextInput
        placeHolder={STRING.SIGNIN.EMAIL}
        icon={ICONS.User({ width: 18, height: 18 })}
        parentStyle={[SPACING.mt4, styles.textInput]}
      />
      <CustomTextInput
        placeHolder={STRING.SIGNIN.PASSWORD}
        icon={ICONS.Lock({ width: 18, height: 18 })}
        parentStyle={[SPACING.mt4, styles.textInput]}
      />
      {/* <Text>Sign In Wiht</Text> */}
    </View>
  );
});

export default SignIn;
