import React from 'react';
import {Text, View} from 'react-native';
import {LineGraphLabelProps} from './types';
import {styles} from './styles';

const LineGraphLabel: React.FC<LineGraphLabelProps> = ({
  day,
  steps,
  index,
  length,
}) => {
  // const changeOn = (() => {
  //   // if (length > 6) {
  //   //   return 2;
  //   // }
  //   return 1;
  // })();
  return (
    <View style={[styles.parent, index === -1 ? styles.parent1 : null]}>
      <Text style={styles.text}>{steps}</Text>
      <Text style={styles.text}>{day}</Text>
    </View>
  );
};

export default LineGraphLabel;
