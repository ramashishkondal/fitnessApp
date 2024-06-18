import React from "react";

export type WithModalProps = {
  modalVisible: boolean;
  setModalFalse: () => void;
  children: React.ReactElement;
};
