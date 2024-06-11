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
import { CustomLoading } from "..";

export type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  parentStyle?: StyleProp<ViewStyle>;
  buttonCtrStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
};
const CustomButton = ({
  title,
  onPress,
  parentStyle,
  buttonCtrStyle,
  textStyle,
  isLoading,
}: CustomButtonProps) => {
  console.log("custom button rendered");
  return (
    <TouchableOpacity style={[styles.parent, parentStyle]} onPress={onPress}>
      <View style={[styles.buttonCtr, buttonCtrStyle]}>
        {isLoading ? (
          <CustomLoading />
        ) : (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);
