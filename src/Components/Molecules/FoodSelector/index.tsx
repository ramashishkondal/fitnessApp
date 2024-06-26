import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../Constants';
import {FoodSelectorProps} from './types';
import {styles} from './styles';

const FoodSelector: React.FC<FoodSelectorProps> = ({foodItem, foodData}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnPress = () => {
    if (!isChecked) {
      foodData.push(foodItem);
    } else {
      const index = foodData.findIndex(item => item.name === foodItem.name);
      if (index !== -1) {
        foodData.splice(index, 1); // Remove the item at the found index
      }
    }
    setIsChecked(!isChecked);
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.parent}>
      <View style={styles.foodNameCtr}>
        <Text style={styles.foodNameText}>{foodItem.name}</Text>
      </View>
      <BouncyCheckbox
        style={styles.bouncyCheckbox}
        size={25}
        fillColor={COLORS.PRIMARY.PURPLE}
        unFillColor={COLORS.PRIMARY.GREY}
        innerIconStyle={{borderColor: COLORS.PRIMARY.GREY}}
        onPress={handleOnPress}
        isChecked={isChecked}
      />
    </TouchableOpacity>
  );
};

export default FoodSelector;
