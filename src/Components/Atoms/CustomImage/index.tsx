import React from "react";
import { CustomImageProps } from "./types";
import { Image } from "react-native";
import { styles } from "./styles";

const CustomImage: React.FC<CustomImageProps> = ({ source, imageStyle }) => {
  return <Image source={source} style={[styles.image, imageStyle]} />;
};

export default CustomImage;
