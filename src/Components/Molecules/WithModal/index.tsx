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
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={setModalFalse}
        swipeDirection={"down"}
        style={styles.parent}
        propagateSwipe={true}
      >
        <View style={styles.horizontalLineCtr}>
          <View style={styles.horizontalLine} />
        </View>
        <View style={styles.modalCtr}>{children}</View>
      </Modal>
    </SafeAreaView>
  );
};

export default WithModal;
