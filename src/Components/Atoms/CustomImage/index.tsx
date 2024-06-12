// libs
import React from "react";
import { Image } from "react-native";

// custom
import { CustomImageProps } from "./types";
import { styles } from "./styles";

const CustomImage: React.FC<CustomImageProps> = ({ source, imageStyle }) => {
  return <Image source={source} style={[styles.image, imageStyle]} />;
};

export default CustomImage;
