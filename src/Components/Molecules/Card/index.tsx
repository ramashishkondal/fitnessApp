// libs
import React from 'react';
import {Pressable, Text, View} from 'react-native';

// 3rd party
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

// custom
import {ANIMATIONS, COLORS} from '../../../Constants';
import {CardProps} from './types';
import {styles} from './styles';

const size = {
  width: 72,
  height: 72,
};

const Card: React.FC<CardProps> = ({text, icon, onToggle, isChecked}) => {
  // reanimated use
  const scale = useSharedValue(ANIMATIONS.sizeNormal);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  // functions
  const handleOnPress = () => {
    onToggle();
    scale.value = withSequence(
      withSpring(ANIMATIONS.sizeIncrease1),
      withSpring(ANIMATIONS.sizeNormal),
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
            size={22}
            fillColor={COLORS.PRIMARY.PURPLE}
            unFillColor={COLORS.PRIMARY.GREY}
            innerIconStyle={{borderColor: COLORS.PRIMARY.GREY}}
            onPress={onToggle}
            isChecked={isChecked}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default Card;
