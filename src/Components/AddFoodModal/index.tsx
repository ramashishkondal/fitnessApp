// libs
import React from "react";
import { Text, View } from "react-native";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";

// custom
import { AddFoodModalProps } from "./types";
import { styles } from "./styles";

const AddFoodModal = ({ modalVisible, setModalVisible }: AddFoodModalProps) => {
  return (
    <Modal
      visible={modalVisible}
      swipeDirection={["down"]} // can be string or an array
      swipeThreshold={200} // default 100
      onSwipeOut={() => {
        setModalVisible(false);
      }}
      onTouchOutside={() => setModalVisible(false)}
      style={{ paddingVertical: "25%", paddingHorizontal: "5%" }}
      modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
    >
      <ModalContent>
        <View style={styles.modalCtr}>
          <View style={styles.horizontalLine} />
          <View></View>
          <Text>something</Text>
        </View>
      </ModalContent>
    </Modal>
  );
};

export default AddFoodModal;
