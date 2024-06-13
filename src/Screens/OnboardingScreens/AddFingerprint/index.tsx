// libs
import React from "react";
import { View } from "react-native";

// custom
import {
  CustomButton,
  WithOnboarding,
  DescriptionText,
  HeadingText,
} from "../../../Components";
import { ICONS, SPACING, STRING } from "../../../Constants";
import { styles } from "./styles";
import { AddProfilePictureProps } from "../../../Defs";

const fingerprintSize = 75;
const AddFingerprint: React.FC<AddProfilePictureProps> = ({ navigation }) => {
  const goToAddProfilePicture = () => {
    navigation.push("AddProfilePicture");
  };
  return (
    <View style={styles.parent}>
      <View style={styles.iconCtr}>
        {ICONS.Fingerprint({ width: fingerprintSize, height: fingerprintSize })}
      </View>
      <HeadingText
        text={STRING.ADD_FINGERPRINT.TITLE}
        textStyle={SPACING.mt3}
      />
      <DescriptionText
        text={STRING.ADD_FINGERPRINT.TITLE_DESCRIPTION}
        textStyle={styles.titleDescriptionText}
      />
      <CustomButton
        title={STRING.ADD_FINGERPRINT.SUBMIT_BUTTON_TEXT}
        parentStyle={SPACING.mtLarge}
      />
      <CustomButton
        title={STRING.ADD_FINGERPRINT.REJECT_BUTTON_TEXT}
        parentStyle={styles.notNowParent}
        textStyle={styles.notNowText}
        onPress={goToAddProfilePicture}
      />
    </View>
  );
};

export default WithOnboarding(AddFingerprint);
