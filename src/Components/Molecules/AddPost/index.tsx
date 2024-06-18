// libs
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

// 3rd party libs
import { Timestamp } from "@react-native-firebase/firestore";
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

// custom
import CustomButton from "../../Atoms/CustomButton";
import { COLORS, ICONS, SIZES, STRING } from "../../../Constants";
import { storePost } from "../../../Utils/userUtils";
import { useAppSelector } from "../../../Redux/Store";
import { AddPostProps } from "./types";
import { styles } from "./styles";

const AddPost: React.FC<AddPostProps> = ({ setModalFalse }) => {
  // constants
  const options: CameraOptions = {
    mediaType: "photo",
  };
  // state use
  const [photo, setPhoto] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const { id: userId, photo: userPhoto, firstName, lastName } = useAppSelector(
    (state) => state.User.data
  );

  // functions
  const openCamera = async () => {
    try {
      const result: ImagePickerResponse = await launchCamera(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri ?? "");
      }
    } catch (e) {
      console.log("error uploading photo from camera - ", e);
    }
  };
  const openGallery = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary(options);
      if (result.assets !== undefined) {
        setPhoto(result?.assets[0]?.uri ?? "");
      }
    } catch (e) {
      console.log("error uploading photo from library - ", e);
    }
  };

  const handlePost = async () => {
    try {
      if (photo === "") {
        throw Error("you have to select a photo");
      }
      if (userId !== null && userPhoto !== null) {
        setIsLoading(true);

        await storePost({
          caption,
          userId,
          createdOn: Timestamp.now(),
          photo,
          comments: [],
          likedByUsersId: [],
          userName: firstName && lastName ? firstName + " " + lastName : "",
          userPhoto,
        });
        setModalFalse();
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.parent}>
      <View>
        <Text style={styles.titleText}>{STRING.ADD_POST.TITLE}</Text>
        {photo ? <Image source={{ uri: photo }} style={styles.image} /> : null}
        <Text style={styles.captionText}>{STRING.ADD_POST.CAPTION}</Text>
        <TextInput
          autoFocus
          maxLength={100}
          onChangeText={setCaption}
          style={styles.textInput}
        />
      </View>
      <View style={styles.footerCtr}>
        <View style={styles.childFooterCtr}>
          <TouchableOpacity onPress={openCamera} style={styles.iconsCtr}>
            {ICONS.Camera({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity onPress={openGallery} style={styles.iconsCtr}>
            {ICONS.Gallery({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconsCtr}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={styles.buttonParentStyle}
          textStyle={{ fontSize: SIZES.font13 }}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default AddPost;
