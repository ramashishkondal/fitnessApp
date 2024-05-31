//libs
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// custom
import {
  CustomButton,
  SelectAvatars,
  SelectCustomPhoto,
} from "../../../Components";
import { SPACING, STRING } from "../../../Constants";
import { AddProfilePictureProps } from "../../../Defs";
import { styles } from "./styles";
import { useAppDispatch } from "../../../Redux/Store";

const AddProfilePicture = ({ navigation }: AddProfilePictureProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);

  const handleSubmit = () => {
    navigation.push("AddPreferences");
  }

  return (
    <View style={styles.parent}>
      <SelectAvatars />
      <Text style={styles.titleText}>{STRING.ADD_PROFILE_PICTURE.TITLE}</Text>
      <Text style={styles.titleDescriptionText}>
        {STRING.ADD_PROFILE_PICTURE.TITLE_DESCRIPTION}
      </Text>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.addPhotoText}>
          {STRING.ADD_PROFILE_PICTURE.ADD_PHOTO_BUTTON}
        </Text>
      </TouchableOpacity>
      <CustomButton
        title={STRING.ADD_PROFILE_PICTURE.BUTTON_TEXT}
        parentStyle={SPACING.mtMedium}
        onPress={handleSubmit}
      />
      <SelectCustomPhoto
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default AddProfilePicture;
