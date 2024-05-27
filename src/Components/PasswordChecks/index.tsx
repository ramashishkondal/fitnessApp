// libs
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { SPACING, STRING } from "../../Constants";

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
        <Text style={styles.text}>{STRING.ADD_PASSWORD.CHECKS.LENGTH}</Text>
      </View>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, caseCheck ? styles.squareChecked : null]}
        />
        <Text style={styles.text}>{STRING.ADD_PASSWORD.CHECKS.CASE}</Text>
      </View>
      <View style={styles.childCtr}>
        <View
          style={[styles.square, numberCheck ? styles.squareChecked : null]}
        />
        <Text style={styles.text}>{STRING.ADD_PASSWORD.CHECKS.NUMBER}</Text>
      </View>
    </View>
  );
};

export default PasswordChecks;
