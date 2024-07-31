// libs
import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';

// 3rd party
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// custom
import {COLORS, STRING} from '../../../Constants';
import {CustomHomeDetailsCardProps} from './types';
import {styles} from './styles';

const CustomHomeDetailsCard: React.FC<CustomHomeDetailsCardProps> = ({
  title,
  handleOnPress,
  source,
  status,
  markerPercentage,
}) => {
  // constants
  const button = {
    style: {
      backgroundColor: '#F4DCDC',
    },
    text: STRING.CUSTOM_HOME_DETAILS_CARD.BUTTON_TEXT_WARNING,
    textStyle: {
      color: '#F5797A',
    },
  };
  if (markerPercentage > 33 && markerPercentage < 66) {
    button.style.backgroundColor = '#FDEFE5';
    button.textStyle.color = COLORS.SECONDARY.ORANGE;
  } else if (markerPercentage > 66 && markerPercentage <= 99) {
    button.style.backgroundColor = COLORS.PRIMARY.LIGHT_PURPLE;
    button.text = STRING.CUSTOM_HOME_DETAILS_CARD.BUTTON_TEXT_SAFE;
    button.textStyle.color = COLORS.PRIMARY.PURPLE;
  } else if (markerPercentage >= 100) {
    button.style.backgroundColor = COLORS.PRIMARY.LIGHT_PURPLE;
    button.text = STRING.CUSTOM_HOME_DETAILS_CARD.BUTTON_TEXT_COMPLETED;
    button.textStyle.color = COLORS.PRIMARY.PURPLE;
  }

  // reanimated use
  const left = useSharedValue(0);
  const animatedMarkerStyle = useAnimatedStyle(() => ({
    left: `${left.value}%`,
  }));

  // effect use
  useEffect(() => {
    left.value = withSpring(markerPercentage);
  }, [left, markerPercentage]);

  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.allDetailsCtr} onPress={handleOnPress}>
        <View style={styles.iconCtr}>
          {/* {icon(size)} */}
          <Image source={source} style={{width: 40, height: 40}} />
        </View>
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
