// libs
import React, { useState } from "react";
import { Image, View } from "react-native";

// custom
import { CustomImageProps } from "./types";
import { styles } from "./styles";
import CustomLoading from "../CustomLoading";
import { COLORS } from "../../../Constants";

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  imageStyle,
  activityIndicatorSize,
  parentStyle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View style={[styles.parent, parentStyle]}>
      {isLoading ? (
        <CustomLoading
          color={COLORS.PRIMARY.PURPLE}
          style={{ position: "absolute" }}
          size={activityIndicatorSize}
        />
      ) : null}
      <Image
        source={source}
        style={[styles.image, imageStyle]}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
};

export default CustomImage;
