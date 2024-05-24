import React from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

export type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  parentStyle?: StyleProp<ViewStyle>;
  buttonCtrStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};
const CustomButton = ({
  title,
  onPress,
  parentStyle,
  buttonCtrStyle,
  textStyle,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity style={[styles.parent, parentStyle]} onPress={onPress}>
      <View style={[styles.buttonCtr, buttonCtrStyle]}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
