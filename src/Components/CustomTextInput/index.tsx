import React from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Animated from "react-native-reanimated";

export type CustomTextInputProps = {
  placeHolder?: string;
  parentStyle?: StyleProp<ViewStyle>;
  iconCtrStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText?: (
    text: string
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  icon?: React.ReactNode;
  autoFocus?: boolean;
  hasError?: boolean;
  value?: string;
};

const CustomTextInput = React.memo(
  ({
    placeHolder,
    parentStyle,
    iconCtrStyle,
    textInputStyle,
    onChangeText,
    icon,
    autoFocus,
    hasError,
    value,
  }: CustomTextInputProps) => {
    return (
      <Animated.View
        style={[
          styles.parent,
          parentStyle,
          hasError ? styles.parentError : null,
        ]}
      >
        {icon ? (
          <View style={[styles.iconCtr, iconCtrStyle]}>{icon}</View>
        ) : null}
        <TextInput
          placeholder={placeHolder}
          style={[styles.textInput, textInputStyle]}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={autoFocus}
          value={value}
        />
      </Animated.View>
    );
  }
);

export default CustomTextInput;
