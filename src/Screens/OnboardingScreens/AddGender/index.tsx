// libs
import React, { useState } from "react";
import { Text, View } from "react-native";

// custom
import { ICONS, SPACING, STRING } from "../../../Constants";
import { Card, CustomButton } from "../../../Components";
import { AddGenderProps, User } from "../../../Defs";
import { styles } from "./styles";

const AddGender = ({ navigation }: AddGenderProps) => {
  const [selectedGender, setSelectedGender] = useState<User["gender"] | null>(
    null
  );

  const toggleCheckBox = (gender: User["gender"]) => {
    setSelectedGender(gender);
  };
  const handleSubmit = () => {
    if (selectedGender !== null) {
      navigation.push("DetailsCompleted");
    }
  };
  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{STRING.ADD_GENDER.TITLE}</Text>
      <View style={styles.genderCtr}>
        <View style={styles.genderCardsCtr}>
          <Card
            text={STRING.ADD_GENDER.MALE}
            icon={ICONS.Male}
            onToggle={() => toggleCheckBox("male")}
            isChecked={selectedGender === "male"}
          />
          <Card
            text={STRING.ADD_GENDER.FEMALE}
            icon={ICONS.Female}
            onToggle={() => toggleCheckBox("female")}
            isChecked={selectedGender === "female"}
          />
        </View>
      </View>
      <Text style={styles.descriptionText}>
        {STRING.ADD_GENDER.DESCRIPTION}
      </Text>
      <CustomButton
        title={STRING.ADD_GENDER.BUTTON_TEXT}
        parentStyle={SPACING.mtMedium}
        onPress={handleSubmit}
      />
    </View>
  );
};

export default AddGender;
