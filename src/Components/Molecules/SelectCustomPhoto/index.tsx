// libs
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

// 3rd party
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
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

// custom
import { COLORS, ICONS, SIZES } from "../../../Constants";
import { SelectCustomPhotoProps } from "./types";
import { styles } from "./styles";

const iconSize = 60;

const SelectCustomPhoto: React.FC<SelectCustomPhotoProps> = ({
  modalVisible,
  setModalVisible,
  setPhoto,
  parentStyle,
  BottomSheetModalStyle,
  mediaType = "photo",
}) => {
  // constants
  const options: CameraOptions = {
    mediaType,
  };

  // effect use
  useEffect(() => {
    if (modalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [modalVisible]);

  // functions
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

  // bottom sheet
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["30%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("sheet changes", index);
  }, []);
  const onDismiss = () => {
    setModalVisible(false);
  };
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onDismiss={onDismiss}
        backdropComponent={function SheetBackdrop() {
          const sheet = useBottomSheetModal();
          return (
            <Pressable
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                backgroundColor: "",
                position: "absolute",
              }}
              onPress={() => {
                sheet.dismissAll();
              }}
            />
          );
        }}
        backgroundStyle={[
          {
            borderRadius: SIZES.rounding3,
            shadowColor: "red",
            shadowRadius: 100,
          },
          BottomSheetModalStyle,
        ]}
      >
        <BottomSheetView style={[styles.modalCtr, parentStyle]}>
          <View style={styles.iconsCtr}>
            <TouchableOpacity style={styles.icons} onPress={openCamera}>
              {ICONS.Camera({
                width: iconSize,
                height: iconSize,
                color: COLORS.PRIMARY.PURPLE,
              })}
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons} onPress={openGallery}>
              {ICONS.Gallery({
                width: iconSize,
                height: iconSize,
                color: COLORS.PRIMARY.PURPLE,
              })}
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SelectCustomPhoto;
