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
  const setModalFalse = () => setModalVisible(false);
  return (
    <Modal
      visible={modalVisible}
      swipeDirection={["down"]} // can be string or an array
      swipeThreshold={200} // default 100
      onSwipeOut={setModalFalse}
      onTouchOutside={setModalFalse}
      style={styles.parent}
      modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      rounded
    >
      <ModalContent style={styles.modalContent}>
        <View style={styles.horizontalLine} />
        <View style={styles.modalCtr}>{children}</View>
      </ModalContent>
    </Modal>
  );
};

export default WithModal;
