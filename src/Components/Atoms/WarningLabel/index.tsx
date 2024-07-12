// libs
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

// 3rd party
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

// custom
import {WarningLabelProps} from './types';
import {styles} from './styles';

const WarningLabel: React.FC<WarningLabelProps> = ({
  parentStyle,
  text,
  onPress,
}) => {
  if (!onPress) {
    return (
      <Animated.View
        style={[styles.parent, parentStyle]}
        entering={FadeIn}
        exiting={FadeOut.duration(1000)}>
        <Text style={styles.warningText}>{text}</Text>
      </Animated.View>
    );
  }
  return (
    <TouchableOpacity style={styles.touchableParent} onPress={onPress}>
      <Animated.View
        style={[styles.parent, parentStyle]}
        entering={FadeIn}
        exiting={FadeOut.duration(1000)}>
        <Text style={styles.warningText}>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default WarningLabel;
