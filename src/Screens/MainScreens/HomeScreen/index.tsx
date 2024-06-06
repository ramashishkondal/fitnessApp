// libs
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import { STRING } from "../../../Constants";
import { styles } from "./styles";
import { CustomHomeDetailsCard } from "../../../Components";
import { HomeScreenProps } from "../../../Defs";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const goToNutrition = () => {
    navigation.push("Nutrition");
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.HOME_SCREEN.TITLE}</Text>
      <Text style={styles.descriptionText}>
        {STRING.HOME_SCREEN.DESCRIPTION}
      </Text>
      <TouchableOpacity>
        <Text style={styles.detailsText}>
          {STRING.HOME_SCREEN.MORE_DETAILS}
        </Text>
      </TouchableOpacity>
      <CustomHomeDetailsCard
        title={"nutrition"}
        handleOnPress={goToNutrition}
      />
    </View>
  );
};

export default HomeScreen;
