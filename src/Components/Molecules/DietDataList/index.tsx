// libs
import React from 'react';
import {View} from 'react-native';

// custom
import DietDataItem from '../DietDataItem';
import {useAppSelector} from '../../../Redux/Store';

const DietDataList: React.FC = () => {
  // redux use
  const {data: dailyMeals} = useAppSelector(state => state.dailyMeals);
  console.log('daik', dailyMeals);
  return (
    <View>
      <DietDataItem item={dailyMeals.breakfast} timeOfMeal="Breakfast" />
      <DietDataItem item={dailyMeals.snack} timeOfMeal="Snack" />
      <DietDataItem item={dailyMeals.lunch} timeOfMeal="Lunch" />
      <DietDataItem item={dailyMeals.dinner} timeOfMeal="Dinner" />
    </View>
  );
};

export default DietDataList;
