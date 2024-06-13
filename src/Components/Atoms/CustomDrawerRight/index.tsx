import React, { useState } from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";
import { useAppSelector } from "../../../Redux/Store";
import CustomLoading from "../CustomLoading";
import { COLORS } from "../../../Constants";

const CustomDrawerRight: React.FC = () => {
  // state use
  const { photo } = useAppSelector((state) => state.User.data);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // functions
  const onLoadEnd = (): void => setIsLoading(false);
  const onLoadStart = (): void => setIsLoading(true);

  return (
    <View style={styles.parent}>
      {isLoading ? (
        <View style={{ position: "absolute" }}>
          <CustomLoading color={COLORS.PRIMARY.PURPLE} />
        </View>
      ) : null}
      <Image
        source={{ uri: photo ?? "" }}
        style={styles.image}
        onLoadEnd={onLoadEnd}
        onLoadStart={onLoadStart}
      />
    </View>
  );
};

export default CustomDrawerRight;
