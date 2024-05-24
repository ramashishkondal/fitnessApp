//libs
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// components
import WithOnboarding from "../../../Components/WithOnboarding";

// styles
import { styles } from "./styles";

// constants
import { SPACING } from "../../../Constants/commonStyles";
import CustomButton from "../../../Components/CustomButton";
import { STRING } from "../../../Constants/strings";
import { IMAGES } from "../../../Constants/images";
import { LandingPageProps } from "../../../Defs";

const LandingPage = WithOnboarding(({ navigation }: LandingPageProps) => {
  const goToSignIn = () => {
    navigation.push("SignIn");
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.LANDING_PAGE.TITLE}</Text>
      <Text style={[styles.titleDescriptionText, SPACING.mt1]}>
        {STRING.LANDING_PAGE.TITLE_DESCRIPTION}
      </Text>
      <Image source={IMAGES.LANDING_PAGE} style={[styles.image, SPACING.mt3]} />
      <CustomButton
        title={STRING.LANDING_PAGE.BUTTON_TEXT}
        parentStyle={SPACING.mt4}
      />
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={goToSignIn}
      >
        <Text style={[styles.signInText1, SPACING.m2]}>
          {STRING.LANDING_PAGE.SIGNIN_1}
          {"  "}
          <Text style={styles.signInText2}>{STRING.LANDING_PAGE.SIGNIN_2}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default LandingPage;
