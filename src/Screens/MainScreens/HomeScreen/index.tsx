import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { STRING } from "../../../Constants";

const HomeScreen = () => {
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.HOME_SCREEN.TITLE}</Text>
      <Text style={styles.descriptionText}>
        {STRING.HOME_SCREEN.DESCRIPTION}
      </Text>
      <Text style={styles.detailsText}>{STRING.HOME_SCREEN.MORE_DETAILS}</Text>
    </View>
  );
};

export default HomeScreen;
