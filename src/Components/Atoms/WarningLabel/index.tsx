// libs
import React from 'react';
import {Text} from 'react-native';

// 3rd party
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

// custom
import {WarningLabelProps} from './types';
import {STRING} from '../../../Constants';
import {styles} from './styles';

const WarningLabel: React.FC<WarningLabelProps> = ({parentStyle}) => {
  return (
    <Animated.View
      style={[styles.parent, parentStyle]}
      entering={FadeIn}
      exiting={FadeOut.duration(1000)}>
      <Text style={styles.warningText}>
        {STRING.WATER_INTAKE.WARNING_MESSAGE}
      </Text>
    </Animated.View>
  );
};

export default WarningLabel;
