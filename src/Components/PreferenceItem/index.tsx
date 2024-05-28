// libs
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

// custom
import { styles } from "./styles";
import BouncyCheckbox from "react-native-bouncy-checkbox/build/dist/BouncyCheckbox";
import { COLORS } from "../../Constants";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type PreferenceItemProps = {
  title?: string;
};
const PreferenceItem = ({ title }: PreferenceItemProps) => {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toogleIsChecked = () => {
    setIsChecked(!isChecked);
  };
  const itemPressedIn = () => {
    scale.value = withSpring(1.05);
    toogleIsChecked();
  };
  const itemPressedOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.parent, animatedStyle]}>
      <Pressable onPressIn={itemPressedIn} onPressOut={itemPressedOut}>
        <View style={styles.childCtr}>
          <View style={styles.textCtr}>
            <Text style={styles.text}>{title}</Text>
          </View>
          <BouncyCheckbox
            size={28}
            fillColor={COLORS.PRIMARY.PURPLE}
            unFillColor={COLORS.PRIMARY.GREY}
            innerIconStyle={{ borderColor: COLORS.PRIMARY.GREY }}
            textStyle={{ fontFamily: "JosefinSans-Regular" }}
            onPress={toogleIsChecked}
            isChecked={isChecked}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default PreferenceItem;
