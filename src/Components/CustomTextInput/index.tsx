import React from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { styles } from "./styles";

export type CustomTextInputProps = {
  placeHolder?: string;
  parentStyle?: StyleProp<ViewStyle>;
  iconCtrStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText?: (text: string) => void;
  icon?: any;
};

const CustomTextInput = ({
  placeHolder,
  parentStyle,
  iconCtrStyle,
  textInputStyle,
  onChangeText,
  icon,
}: CustomTextInputProps) => {
  return (
    <View style={[styles.parent, parentStyle]}>
      {icon ? <View style={[styles.iconCtr, iconCtrStyle]}>{icon}</View> : null}
      <TextInput
        placeholder={placeHolder}
        style={[styles.textInput, textInputStyle]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default CustomTextInput;
