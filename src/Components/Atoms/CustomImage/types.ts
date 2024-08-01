import {StyleProp, ActivityIndicatorProps, ViewStyle} from 'react-native';
import {Source, ImageStyle, FastImageProps} from 'react-native-fast-image';

export type CustomImageProps = {
  source: number | Source | undefined;
  imageStyle?: StyleProp<ImageStyle>;
  parentStyle?: StyleProp<ViewStyle>;
  activityIndicatorSize?: ActivityIndicatorProps['size'];
  handleLoadEnd?: () => void;
  resizeMode?: FastImageProps['resizeMode'];
  onLoad?: () => void;
};
