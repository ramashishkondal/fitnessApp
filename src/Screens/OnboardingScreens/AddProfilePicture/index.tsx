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
import { useAppDispatch } from "../../../Redux/Store";
import { updateUserData } from "../../../Redux/Reducers/currentUser";
import { styles } from "./styles";
import { DescriptionText, HeadingText } from "../../../Components/Atoms";

const AddProfilePicture: React.FC<AddProfilePictureProps> = ({
  navigation,
}) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [customPhoto, setCustomPhoto] = useState<string>();

  // redux use
  const dispatch = useAppDispatch();

  // functions
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
      <HeadingText text={STRING.ADD_PROFILE_PICTURE.TITLE} />
      <DescriptionText
        text={STRING.ADD_PROFILE_PICTURE.TITLE_DESCRIPTION}
        textStyle={styles.titleDescriptionText}
      />
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
