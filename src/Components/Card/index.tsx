// libs
import React from "react";
import { Pressable, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

// custom
import { styles } from "./styles";
import { ANIMATIONS, COLORS } from "../../Constants";

const size = {
  width: 80,
  height: 90,
};

type CardProps = {
  text: string;
  icon: (size: {
    width: number;
    height: number;
    color?: string;
  }) => React.ReactNode;
  onToggle: () => void;
  isChecked: boolean;
};
const Card = ({ text, icon, onToggle, isChecked }: CardProps) => {
  const scale = useSharedValue(ANIMATIONS.sizeNormal);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleOnPress = () => {
    onToggle();
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease1),
      withSpring(ANIMATIONS.sizeNormal)
    );
  };
  return (
    <Animated.View style={animatedStyle}>
      <Pressable style={styles.parent} onPress={handleOnPress}>
        <View style={styles.child}>
          <View style={styles.iconCtr}>{icon(size)}</View>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.checkboxCtr}>
          <BouncyCheckbox
            size={25}
            fillColor={COLORS.PRIMARY.PURPLE}
            unFillColor={COLORS.PRIMARY.GREY}
            innerIconStyle={{ borderColor: COLORS.PRIMARY.GREY }}
            onPress={onToggle}
            isChecked={isChecked}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default Card;
