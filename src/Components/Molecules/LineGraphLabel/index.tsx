import React from 'react';
import {Text, View} from 'react-native';
import {LineGraphLabelProps} from './types';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

const LineGraphLabel: React.FC<LineGraphLabelProps> = ({day, steps}) => {
  return (
    <View
      style={{
        backgroundColor: COLORS.PRIMARY.PURPLE,
        justifyContent: 'center',
        padding: 4,
        // paddingHorizontal: 24,
        marginHorizontal: 16,
        borderRadius: SIZES.rounding0,
      }}>
      <Text style={{color: 'white', fontFamily: FONT_FAMILY.MEDIUM}}>
        {steps}
      </Text>

      <Text style={{color: 'white', fontFamily: FONT_FAMILY.MEDIUM}}>
        {day}
      </Text>
    </View>
  );
};

export default LineGraphLabel;
