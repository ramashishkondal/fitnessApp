import React, {useState} from 'react';
import {View, Text} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../Constants';
import {MealSelectorProps} from './types';
import {styles} from './styles';

const MealSelector: React.FC<MealSelectorProps> = ({title, mealTime}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnPress = () => {
    switch (title) {
      case 'Breakfast':
        mealTime.breakfast = !isChecked;
        break;
      case 'Snack':
        mealTime.snack = !isChecked;
        break;
      case 'Lunch':
        mealTime.lunch = !isChecked;
        break;
      case 'Dinner':
        mealTime.dinner = !isChecked;
        break;
      default:
        console.log('edae');
    }
    setIsChecked(!isChecked);
  };
  return (
    <View style={styles.parent}>
      <BouncyCheckbox
        size={20}
        fillColor={COLORS.PRIMARY.PURPLE}
        unFillColor={COLORS.PRIMARY.GREY}
        innerIconStyle={{borderColor: COLORS.PRIMARY.GREY}}
        onPress={handleOnPress}
        isChecked={isChecked}
        disableText
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default MealSelector;
