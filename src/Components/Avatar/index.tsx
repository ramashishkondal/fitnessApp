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

const Avatar = ({
  item,
  selectedItem,
  setSelectedItem,
}: {
  item: { icon: React.ReactNode; name: string };
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
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
