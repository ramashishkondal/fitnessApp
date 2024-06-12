// libs
import React from "react";
import { Pressable } from "react-native";

// 3rd party
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

// custom
import { ANIMATIONS } from "../../../Constants";
import { styles } from "./styles";
import { AvatarProps } from "./types";

const Avatar: React.FC<AvatarProps> = ({
  item,
  selectedItem,
  setSelectedItem,
}) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handleOnPress = () => {
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease3),
      withSpring(ANIMATIONS.sizeNormal)
    );
    setSelectedItem(item.name);
  };
  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        style={[
          styles.avatarCtr,
          selectedItem === item.name ? styles.avatarSelected : null,
        ]}
        onPress={handleOnPress}
      >
        {item.icon}
      </Pressable>
    </Animated.View>
  );
};

export default Avatar;
