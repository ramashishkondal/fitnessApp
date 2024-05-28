// libs
import React from "react";
import { Text, View } from "react-native";

// custom
import {
  CustomButton,
  PreferenceItem,
  WithOnboarding,
} from "../../../Components";
import { styles } from "./styles";
import { SPACING, STRING } from "../../../Constants";
import { AddPreferencesProps } from "../../../Defs";

const PREFERENCES = [
  "Weight Loss",
  "Better sleeping habit",
  "Track my nutrition",
  "Improve overall fitness",
];
const Preferences = PREFERENCES.map((val, index) => (
  <PreferenceItem title={val} key={index} />
));

const AddPreferences = ({ navigation }: AddPreferencesProps) => {
  const goToAddInterests = () => {
    navigation.push("AddInterests");
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.ADD_PREFERENCES.TITLE}</Text>
      <Text style={styles.titleDescriptionText}>
        {STRING.ADD_PREFERENCES.TITLE_DESCRIPTION}
      </Text>
      {Preferences}
      <CustomButton
        title={STRING.ADD_PREFERENCES.BUTTON_TEXT}
        parentStyle={SPACING.mtMedium}
        onPress={goToAddInterests}
      />
    </View>
  );
};

export default WithOnboarding(AddPreferences);
