import React from "react";

export type WithModalProps = {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children: React.ReactElement;
};
