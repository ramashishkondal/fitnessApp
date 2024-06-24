// libs
import React, {useRef} from 'react';
import {TouchableOpacity, View, ScrollView, Alert} from 'react-native';

// custom
import {CustomButton, DescriptionText, HeadingText} from '../../Atoms';
import {ChooseFoodProps} from './types';
import {ICONS} from '../../../Constants';
import MealSelector from '../MealSelector';
import FoodSelector from '../FoodSelector';
import {
  DailyMeals,
  Meal,
  updateAllMealData,
} from '../../../Redux/Reducers/dailyMeal';
import {useAppDispatch} from '../../../Redux/Store';
import {styles} from './styles';
import {foodData} from '../../../Constants/commonConstants';

const size = {
  width: 50,
  height: 50,
};

export type MealsSelected = {
  mealTime: {
    snack: boolean;
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
  foodData: Array<Meal>;
};
const ChooseFood: React.FC<ChooseFoodProps> = ({setModalFalse}) => {
  const dispatch = useAppDispatch();
  const mealsSelected = useRef<MealsSelected>({
    mealTime: {
      snack: false,
      breakfast: false,
      dinner: false,
      lunch: false,
    },
    foodData: [],
  });

  const handleSubmit = () => {
    const dtArray: DailyMeals = {
      breakfast: [],
      dinner: [],
      lunch: [],
      snack: [],
    };
    let count = 0;
    if (mealsSelected.current.mealTime.breakfast === true) {
      dtArray.breakfast = mealsSelected.current.foodData;
      ++count;
    }
    if (mealsSelected.current.mealTime.snack === true) {
      dtArray.snack = mealsSelected.current.foodData;
      ++count;
    }
    if (mealsSelected.current.mealTime.lunch === true) {
      dtArray.lunch = mealsSelected.current.foodData;
      ++count;
    }
    if (mealsSelected.current.mealTime.dinner === true) {
      dtArray.dinner = mealsSelected.current.foodData;
      ++count;
    }
    if (count === 0) {
      Alert.alert(
        'Error',
        'Please select the mealtime you consumed your food on.',
      );
      return;
    }
    dispatch(updateAllMealData(dtArray));
    setModalFalse();
  };
  return (
    <View style={styles.parent}>
      <ScrollView style={styles.parent}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.foodBowlCtr}>{ICONS.FoodBowl(size)}</View>
          <View style={styles.headingCtr}>
            <HeadingText text="Choose Food" textStyle={styles.headingText} />
            <DescriptionText text="Select your meal and your foods that you consume today" />
          </View>
          <View style={styles.MealCtr}>
            <MealSelector
              title="Snack"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Lunch"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Dinner"
              mealTime={mealsSelected.current.mealTime}
            />
            <MealSelector
              title="Breakfast"
              mealTime={mealsSelected.current.mealTime}
            />
          </View>
          <View style={styles.foodCtr}>
            {foodData.map(item => (
              <FoodSelector
                foodItem={item}
                foodData={mealsSelected.current.foodData}
              />
            ))}
          </View>
        </TouchableOpacity>
        <CustomButton
          title="Add"
          onPress={handleSubmit}
          parentStyle={styles.customButtonParent}
        />
      </ScrollView>
    </View>
  );
};

export default ChooseFood;
