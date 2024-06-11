//libs
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// custom
import { CustomButton, WithOnboarding } from "../../../Components";
import { SPACING, STRING, IMAGES } from "../../../Constants/";
import { LandingPageProps } from "../../../Defs";
import { styles } from "./styles";

const LandingPage = ({ navigation }: LandingPageProps) => {
  const goToSignIn = () => {
    navigation.push("SignIn");
  };
  const goToStarting = () => {
    navigation.navigate("AddEmail");
  };
  console.log("onboarding screen rendered");
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
        onPress={goToStarting}
      />
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={goToSignIn}
      >
        <Text style={[styles.signInText1, SPACING.m2]}>
          {STRING.LANDING_PAGE.SIGNIN_1}{" "}
          <Text style={styles.signInText2}>{STRING.LANDING_PAGE.SIGNIN_2}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithOnboarding(LandingPage);
