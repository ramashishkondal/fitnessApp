//libs
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

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
import { updateUserData } from "../../../Redux/Reducers/currentUser";

const AddProfilePicture = ({ navigation }: AddProfilePictureProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const [avatar, setAvatar] = useState<string>("");
  const [customPhoto, setCustomPhoto] = useState<string>();
  const openModal = () => setModalVisible(true);
  const handleSubmit = () => {
    if (avatar || customPhoto) {
      console.log("photo is ", customPhoto ?? avatar);
      dispatch(updateUserData({ photo: customPhoto ?? avatar }));
      navigation.push("AddPreferences");
    } else {
      Alert.alert("You have to select a photo", "Select one of the avatars");
    }
  };
  return (
    <View style={styles.parent}>
      {customPhoto ? (
        <Image source={{ uri: customPhoto }} style={styles.photo} />
      ) : (
        <SelectAvatars photo={avatar} setPhoto={setAvatar} />
      )}
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
        setPhoto={setCustomPhoto}
      />
    </View>
  );
};

export default AddProfilePicture;
