// libs
import React from 'react';
import {Text, View} from 'react-native';

// custom
import {NutritionStatsProps} from './types';
import {styles} from './styles';

const NutritionStats = ({
  item: {percentage, quantity, title, color},
}: NutritionStatsProps) => {
  return (
    <View style={styles.parent}>
      <View style={styles.titleCtr}>
        <View style={[styles.colorCtr, {backgroundColor: color}]} />
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.quantityText}>{quantity}g</Text>
      <Text style={styles.percentageText}>{percentage}%</Text>
    </View>
  );
};

export default NutritionStats;
