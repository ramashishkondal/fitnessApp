// libs
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

// custom
import {ICONS} from '../../../Constants';
import {NutritionHeaderRightProps} from './types';
import {styles} from './styles';

const NutritionHeaderRight = ({handleOnPress}: NutritionHeaderRightProps) => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.iconCtr} onPress={handleOnPress}>
        {ICONS.PLUS_CIRCLE({width: 25, height: 25})}
      </TouchableOpacity>
    </View>
  );
};

export default NutritionHeaderRight;
