import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

const options: CameraOptions = {
  mediaType: "photo",
};
const openCamera = async () => {
  try {
    const result: ImagePickerResponse = await launchCamera(options);
    if (result.assets !== undefined) {
      setPhoto(result?.assets[0]?.uri);
    }
  } catch (e) {
    console.log("error uploading photo from camera - ", e);
  }
};
const openGallery = async () => {
  try {
    const result: ImagePickerResponse = await launchImageLibrary(options);
    if (result.assets !== undefined) {
      setPhoto(result?.assets[0]?.uri);
    }
    setModalVisible(false);
  } catch (e) {
    console.log("error uploading photo from library - ", e);
  }
};
