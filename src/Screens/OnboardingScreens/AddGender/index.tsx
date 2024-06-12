// libs
import React, { useState } from "react";
import { Alert, View } from "react-native";

// custom
import { ICONS, SPACING, STRING } from "../../../Constants";
import { Card, CustomButton } from "../../../Components";
import { AddGenderProps, User } from "../../../Defs";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";
import { DescriptionText, HeadingText } from "../../../Components/Atoms";

const AddGender: React.FC<AddGenderProps> = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState<User["gender"] | null>(
    null
  );
  const dispatch = useAppDispatch();
  const toggleCheckBox = (gender: User["gender"]) => {
    setSelectedGender(gender);
  };
  const handleSubmit = () => {
    if (selectedGender !== null) {
      dispatch(updateUserData({ gender: selectedGender }));
      navigation.reset({
        routes: [{ name: "DetailsCompleted" }],
      });
    } else {
      Alert.alert("You have to select your gender");
    }
  };
  return (
    <View style={styles.parent}>
      <HeadingText text={STRING.ADD_GENDER.TITLE} textStyle={SPACING.mb5} />
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
      <DescriptionText
        text={STRING.ADD_GENDER.DESCRIPTION}
        textStyle={SPACING.m4}
      />
      <CustomButton
        title={STRING.ADD_GENDER.BUTTON_TEXT}
        parentStyle={SPACING.m3}
        onPress={handleSubmit}
      />
    </View>
  );
};
export default AddGender;
