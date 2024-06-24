// libs
import React from 'react';
import {Text, View} from 'react-native';

// custom
import {PieChartInfoItemProps} from './types';
import {styles} from './styles';

const PieChartInfoItem = ({item, percentage, color}: PieChartInfoItemProps) => {
  return (
    <View style={styles.parent}>
      <View style={[styles.colorCtr, {backgroundColor: color}]} />
      <Text style={styles.text}>
        {item} {percentage}%
      </Text>
    </View>
  );
};

export default PieChartInfoItem;
