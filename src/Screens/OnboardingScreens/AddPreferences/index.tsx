// libs
import React, { useRef } from "react";
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
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddPreferences = ({ navigation }: AddPreferencesProps) => {
  const dispatch = useAppDispatch();
  const PREFERENCES = useRef([
    { title: "Weight Loss", selected: false },
    { title: "Better sleeping habit", selected: false },
    { title: "Track my nutrition", selected: false },
    { title: "Improve overall fitness", selected: false },
  ]);
  const Preferences = PREFERENCES.current.map((val, index) => (
    <PreferenceItem item={val} key={index} />
  ));
  const goToAddInterests = () => {
    console.log("value of preff", PREFERENCES.current);
    dispatch(
      updateUserData({
        preferences: PREFERENCES.current.filter((item) => item.selected),
      })
    );
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
