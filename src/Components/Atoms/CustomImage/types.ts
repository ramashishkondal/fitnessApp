import {
  ImageProps,
  ImageStyle,
  StyleProp,
  ActivityIndicatorProps,
  ViewStyle,
} from 'react-native';

export type CustomImageProps = {
  source: ImageProps['source'];
  imageStyle?: StyleProp<ImageStyle>;
  parentStyle?: StyleProp<ViewStyle>;
  activityIndicatorSize?: ActivityIndicatorProps['size'];
  handleLoadEnd?: () => void;
};
