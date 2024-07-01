// libs
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// custom
import {COLORS, ICONS, SIZES} from '../../../Constants';
import {DietDataItemProps} from './types';
import {styles} from './styles';
import {useAppDispatch} from '../../../Redux/Store';
import {Meal, resetMealDataItems} from '../../../Redux/Reducers/dailyMeal';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

const DietDataItem = ({item, timeOfMeal}: DietDataItemProps) => {
  // redux use
  const dispatch = useAppDispatch();

  // functions
  const handleClose = () => {
    switch (timeOfMeal) {
      case 'Breakfast':
        dispatch(resetMealDataItems({breakfast: []}));
        break;
      case 'Snack':
        dispatch(resetMealDataItems({snack: []}));
        break;
      case 'Lunch':
        dispatch(resetMealDataItems({lunch: []}));
        break;
      case 'Dinner':
        dispatch(resetMealDataItems({dinner: []}));
        break;
    }
  };
  if (item.length === 0) {
    return null;
  }

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>{timeOfMeal}</Text>
      {Object.values(
        item.reduce(
          (acc: {[key in string]: {freq: number; data: Meal}}, curr) => {
            if (acc?.[curr.name]) {
              acc[curr.name] = {freq: acc[curr.name].freq + 1, data: curr};
            } else {
              acc[curr.name] = {freq: 1, data: curr};
            }
            return acc;
          },
          {},
        ),
      ).map((val, index, arr) => {
        return (
          <View
            style={[
              styles.childCtr,
              index !== 0 && index !== arr.length ? styles.childCtrTop : null,
            ]}
            key={index}>
            <View style={styles.titleCtr}>
              <Text style={styles.productTitleText}>
                {val.data.name}
                <Text
                  style={{
                    color: COLORS.SECONDARY.GREY,
                    fontSize: SIZES.font11,
                    fontFamily: FONT_FAMILY.REGULAR,
                  }}>
                  {val.freq > 1 ? ' x ' + val.freq : ''}
                </Text>
              </Text>
              <Text style={styles.quantityText}>
                {val.data.serving_size_g} grams
              </Text>
            </View>
            <View>
              <Text style={styles.caloriesText}>
                {val.data.calories * val.freq}
              </Text>
            </View>
          </View>
        );
      })}
      <TouchableOpacity style={styles.closeCtr} onPress={handleClose}>
        <View>{ICONS.Close({width: 35, height: 35})}</View>
      </TouchableOpacity>
    </View>
  );
};

export default DietDataItem;
