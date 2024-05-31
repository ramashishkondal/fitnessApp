// libs
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

// custom
import { ANIMATIONS } from "../../Constants";
import { styles } from "./styles";

const Avatar = ({ item, setSelected }: any) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handleOnPress = () => {
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease3),
      withSpring(ANIMATIONS.sizeNormal)
    );
  };
  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={styles.avatarCtr} onPress={handleOnPress}>
        {item}
      </Pressable>
    </Animated.View>
  );
};

export default Avatar;
