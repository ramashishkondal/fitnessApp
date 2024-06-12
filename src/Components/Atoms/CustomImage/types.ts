import { ImageProps, ImageStyle, StyleProp } from "react-native";

export type CustomImageProps = {
  source: ImageProps["source"];
  imageStyle?: StyleProp<ImageStyle>;
};
