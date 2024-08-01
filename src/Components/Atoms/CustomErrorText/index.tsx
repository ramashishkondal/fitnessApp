// libs
import React from 'react';
import {Text} from 'react-native';

// 3rd party
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

// custom
import {CustomErrorTextProps} from './types';
import {styles} from './styles';

const CustomErrorText: React.FC<CustomErrorTextProps> = ({
  text,
  parentStyle,
}) => {
  return (
    <Animated.View
      style={[styles.parent, parentStyle]}
      entering={FadeIn}
      exiting={FadeOut}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

export default CustomErrorText;
