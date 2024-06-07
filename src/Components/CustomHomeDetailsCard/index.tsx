// libs
import React, { useCallback, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";

// custom
import { styles } from "./styles";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "../../Constants";

type CustomHomeDetailsCardProps = {
  title: string;
  handleOnPress: () => void;
  status: string;
  icon: any;
  markerPercentage: number;
};

const size = {
  width: 40,
  height: 40,
};

const CustomHomeDetailsCard = ({
  title,
  handleOnPress,
  icon,
  status,
  markerPercentage,
}: CustomHomeDetailsCardProps) => {
  const left = useSharedValue(0);
  const animatedMarkerStyle = useAnimatedStyle(() => ({
    left: `${left.value}%`,
  }));

  useEffect(() => {
    left.value = withSpring(markerPercentage);
  }, [markerPercentage]);

  let button = {
    style: {
      backgroundColor: "#F4DCDC",
    },
    text: "Warning",
    textStyle: {
      color: "#F5797A",
    },
  };
  if (markerPercentage > 33 && markerPercentage < 66) {
    button.style.backgroundColor = "#fad3b9";
  } else if (markerPercentage > 66) {
    button.style.backgroundColor = COLORS.PRIMARY.LIGHT_PURPLE;
    button.text = "On";
    button.textStyle.color = COLORS.PRIMARY.PURPLE;
  }

  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.allDetailsCtr} onPress={handleOnPress}>
        <View style={styles.iconCtr}>{icon(size)}</View>
        <View style={styles.childCtr}>
          <View style={styles.upperCtr}>
            <View style={styles.descTextCtr}>
              <Text style={styles.titleText}>{title}</Text>
              <Text style={styles.descriptionText}>{status}</Text>
            </View>
            <View style={styles.buttonCtr}>
              <View style={[styles.buttonTextCtr, button.style]}>
                <Text style={[styles.buttonText, button.textStyle]}>
                  {button.text}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.lineCtr}>
            <View style={styles.lines}>
              <View style={styles.lineRed} />
              <View style={styles.lineOrange} />
              <View style={styles.linePurple} />
            </View>
            <Animated.View style={[styles.marker, animatedMarkerStyle]} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHomeDetailsCard;
