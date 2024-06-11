// libs
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

// custom
import { styles } from "./styles";
import { ANIMATIONS } from "../../Constants";

type InterestItemProps = {
  item: { title: string; icon: React.ReactNode; selected: boolean };
};

const InterestItem = ({ item }: InterestItemProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const scale = useSharedValue(ANIMATIONS.sizeNormal);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handlePress = () => {
    setIsSelected(!isSelected);
    item.selected = !item.selected;
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease3),
      withSpring(ANIMATIONS.sizeNormal)
    );
  };

  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.child} onPress={handlePress}>
        <Animated.View
          style={[
            styles.iconCtr,
            isSelected ? styles.iconCtrSelected : null,
            animatedStyle,
          ]}
        >
          {item.icon}
        </Animated.View>
        <View style={styles.textCtr}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default InterestItem;
