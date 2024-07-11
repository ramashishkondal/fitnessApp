import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';

export type CustomTextInputProps = {
  placeHolder?: string;
  parentStyle?: StyleProp<ViewStyle>;
  iconCtrStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText?: (
    text: string,
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  icon?: React.ReactNode;
  autoFocus?: boolean;
  hasError?: boolean;
  value?: string;
  textInputProps?: TextInputProps;
  allowPeeking?: boolean;
};
