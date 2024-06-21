// libs
import React from "react";
import { SafeAreaView, View } from "react-native";

// 3rd party

// custom
import { WithModalProps } from "./types";
import { styles } from "./styles";
import Modal from "react-native-modal/dist/modal";

const WithModal: React.FC<WithModalProps> = ({
  modalVisible,
  children,
  setModalFalse,
  parentStyle,
  barShown = true,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={setModalFalse}
      swipeDirection={"down"}
      style={[styles.parent, parentStyle]}
      propagateSwipe={true}
    >
      {barShown ? (
        <View style={styles.horizontalLineCtr}>
          <View style={styles.horizontalLine} />
        </View>
      ) : null}
      <View style={styles.modalCtr}>{children}</View>
    </Modal>
  );
};

export default WithModal;
