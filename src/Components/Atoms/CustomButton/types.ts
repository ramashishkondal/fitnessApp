import { StyleProp, ViewStyle, TextStyle } from "react-native";

export type CustomButtonProps = {
  title?: string;
  onPress?: () => void;
  parentStyle?: StyleProp<ViewStyle>;
  buttonCtrStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
};
