// libs
import React from "react";
import { View } from "react-native";
import { Modal, ModalContent, SlideAnimation } from "react-native-modals";

// custom
import { WithModalProps } from "./types";
import { styles } from "./styles";

const WithModal = ({
  modalVisible,
  setModalVisible,
  children,
}: WithModalProps) => {
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
        <View style={styles.modalCtr}>{children}</View>
      </ModalContent>
    </Modal>
  );
};

export default WithModal;
