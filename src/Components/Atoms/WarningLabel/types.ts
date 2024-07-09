import {StyleProp, ViewStyle} from 'react-native';

export type WarningLabelProps = {
  parentStyle?: StyleProp<ViewStyle>;
  text?: string;
  onPress?: () => void;
};
