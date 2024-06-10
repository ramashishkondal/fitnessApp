import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

import { COLORS, ICONS, SIZES } from "../../Constants";
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import CustomButton from "../CustomButton";
import { styles } from "./styles";
import { storePost } from "../../Utils/userUtils";
import { useAppSelector } from "../../Redux/Store";
import { Timestamp } from "@react-native-firebase/firestore";

const AddPost = ({
  setModalVisible,
}: {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [photo, setPhoto] = useState("");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id: userId, photo: userPhoto, firstName, lastName } = useAppSelector(
    (state) => state.User.data
  );
  const options: CameraOptions = {
    mediaType: "photo",
  };
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
          noOfComments: 0,
          noOfLikes: 0,
          userName: firstName && lastName ? firstName + " " + lastName : "",
          userPhoto,
        });
        setModalVisible(false);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        maxWidth: "100%",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <View>
        <Text style={styles.titleText}>Create a Post</Text>
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={{
              height: 200,
              width: "100%",
              borderRadius: SIZES.rounding2,
            }}
          />
        ) : null}
        <Text style={{ marginTop: 8, fontSize: SIZES.font13 }}>
          Add a Caption
        </Text>
        <TextInput
          autoFocus
          maxLength={100}
          onChangeText={setCaption}
          style={{ marginVertical: 10 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          marginHorizontal: 8,
          borderColor: COLORS.SECONDARY.GREY,
          padding: 10,
          paddingVertical: 20,
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 60,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={openCamera}
            style={{ marginHorizontal: 8 }}
          >
            {ICONS.Camera({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openGallery}
            style={{ marginHorizontal: 8 }}
          >
            {ICONS.Gallery({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
          <TouchableOpacity style={{ marginHorizontal: 8 }}>
            {ICONS.SmileyGood({
              width: 24,
              height: 24,
              color: COLORS.SECONDARY.GREY,
            })}
          </TouchableOpacity>
        </View>
        <CustomButton
          title="Post"
          parentStyle={{ maxWidth: 100, maxHeight: 40 }}
          textStyle={{ fontSize: SIZES.font13 }}
          onPress={handlePost}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

export default AddPost;
