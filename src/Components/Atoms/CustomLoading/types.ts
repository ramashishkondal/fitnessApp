import {ActivityIndicatorProps, StyleProp, ViewStyle} from 'react-native';
export type CustomLoadingProps = {
  color?: string;
  style?: StyleProp<ViewStyle>;
  size?: ActivityIndicatorProps['size'];
};
