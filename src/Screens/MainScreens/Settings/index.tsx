// libs
import React from "react";
import { Text, View } from "react-native";

// custom
import { styles } from "./styles";
import { STRING } from "../../../Constants";

const Settings = () => {
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.SETTINGS.TITLE}</Text>
    </View>
  );
};

export default Settings;
