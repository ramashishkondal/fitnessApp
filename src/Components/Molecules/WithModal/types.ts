import React from "react";
import { StyleProp, ViewStyle } from "react-native";

export type WithModalProps = {
  modalVisible: boolean;
  setModalFalse: () => void;
  children: React.ReactElement | null;
  parentStyle?: StyleProp<ViewStyle>;
  barShown?: boolean;
};
