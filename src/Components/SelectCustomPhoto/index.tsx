// libs
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import {
  CameraOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// custom
import { ICONS, SIZES } from "../../Constants";
import { styles } from "./styles";

export type SelectCustomPhotoProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const iconSize = 60;

const SelectCustomPhoto = ({
  modalVisible,
  setModalVisible,
}: SelectCustomPhotoProps) => {
  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current?.present();
    }
  }, [modalVisible]);

  const options: CameraOptions = {
    mediaType: "photo",
  };
  const openCamera = async () => {
    const result: ImagePickerResponse = await launchCamera(options);
    console.log(result);
  };
  const openGallery = async () => {
    const result: ImagePickerResponse = await launchImageLibrary(options);
    console.log(result);
  };

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    setModalVisible(false);
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{
          borderRadius: SIZES.rounding3,
        }}
      >
        <BottomSheetView style={styles.modalCtr}>
          <View style={styles.iconsCtr}>
            <TouchableOpacity style={styles.icons} onPress={openCamera}>
              {ICONS.Camera({ width: iconSize, height: iconSize })}
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={openGallery}>
              {ICONS.Gallery({ width: iconSize, height: iconSize })}
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SelectCustomPhoto;
