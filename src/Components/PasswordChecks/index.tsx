// libs
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { SPACING, STRING } from "../../Constants";
import { DescriptionText } from "../Atoms";

type PasswordChecksProps = {
  lengthCheck: boolean;
  caseCheck: boolean;
  numberCheck: boolean;
};

const PasswordChecks = ({
  lengthCheck,
  caseCheck,
  numberCheck,
}: PasswordChecksProps) => {
  return (
    <View style={[styles.parent, SPACING.mt1]}>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, lengthCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.LENGTH}
          textStyle={styles.text}
        />
      </View>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, caseCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.CASE}
          textStyle={styles.text}
        />
      </View>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, numberCheck ? styles.squareChecked : null]}
        />
        <DescriptionText
          text={STRING.ADD_PASSWORD.CHECKS.NUMBER}
          textStyle={styles.text}
        />
      </View>
    </View>
  );
};

export default PasswordChecks;
