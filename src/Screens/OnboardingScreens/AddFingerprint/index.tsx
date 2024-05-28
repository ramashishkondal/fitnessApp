// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { CustomButton, WithOnboarding } from "../../../Components";
import { ICONS, SPACING, STRING } from "../../../Constants";
import { styles } from "./styles";
import { AddProfilePictureProps } from "../../../Defs";

const fingerprintSize = 75;
const AddFingerprint = ({ navigation }: AddProfilePictureProps) => {
  const goToAddProfilePicture = () => {
    navigation.push("AddProfilePicture");
  };
  return (
    <View style={styles.parent}>
      <View style={styles.iconCtr}>
        {ICONS.Fingerprint({ width: fingerprintSize, height: fingerprintSize })}
      </View>
      <Text style={styles.titleText}>{STRING.ADD_FINGERPRINT.TITLE}</Text>
      <Text style={styles.titleDescriptionText}>
        {STRING.ADD_FINGERPRINT.TITLE_DESCRIPTION}
      </Text>
      <CustomButton
        title={STRING.ADD_FINGERPRINT.SUBMIT_BUTTON_TEXT}
        parentStyle={SPACING.mtLarge}
      />
      <TouchableOpacity onPress={goToAddProfilePicture}>
        <Text style={styles.notNowText}>
          {STRING.ADD_FINGERPRINT.REJECT_BUTTON_TEXT}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithOnboarding(AddFingerprint);
