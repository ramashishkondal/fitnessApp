import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLORS} from '../../../Constants';
import {FoodSelectorProps} from './types';
import {styles} from './styles';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const FoodSelector: React.FC<FoodSelectorProps> = ({
  foodItem,
  foodData,
  setFoodData,
}) => {
  const handleOnPress = () => {
    if (!foodItem.isSelected) {
      foodData.push({...foodItem, id: uuidv4()});
      setFoodData(val =>
        val.map(item => {
          if (item.name === foodItem.name) {
            return {
              ...item,
              isSelected: true,
            };
          }
          return item;
        }),
      );
    } else {
      setFoodData(val =>
        val.map(item => {
          if (item.name === foodItem.name) {
            return {
              ...item,
              isSelected: false,
            };
          }
          return item;
        }),
      );
      const index = foodData.findIndex(item => item.name === foodItem.name);
      if (index !== -1) {
        foodData.splice(index, 1); // Remove the item at the found index
      }
    }
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={styles.parent}>
      <View style={styles.foodNameCtr}>
        <Text style={styles.foodNameText}>{foodItem.name}</Text>
      </View>
      <BouncyCheckbox
        style={styles.bouncyCheckbox}
        size={20}
        fillColor={COLORS.PRIMARY.PURPLE}
        unFillColor={COLORS.PRIMARY.GREY}
        innerIconStyle={{borderColor: COLORS.PRIMARY.GREY}}
        onPress={handleOnPress}
        isChecked={foodItem.isSelected}
      />
    </TouchableOpacity>
  );
};

export default FoodSelector;
