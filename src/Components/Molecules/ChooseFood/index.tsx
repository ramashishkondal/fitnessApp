// libs
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, ScrollView, Alert} from 'react-native';

// custom
import {CustomButton, DescriptionText, HeadingText} from '../../Atoms';
import {ChooseFoodProps} from './types';
import {ICONS} from '../../../Constants';
import MealSelector from '../MealSelector';
import FoodSelector from '../FoodSelector';
import {DailyMeals, Meal} from '../../../Redux/Reducers/dailyMeal';
import {useAppSelector} from '../../../Redux/Store';
import {styles} from './styles';
import {foodData} from '../../../Constants/commonConstants';
import {storeMealData} from '../../../Utils/userUtils';

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
  // state use
  const [isLoading, setIsLoading] = useState(false);

  // redux use
  const {id} = useAppSelector(state => state.User.data);
  const {data: mealsData} = useAppSelector(state => state.dailyMeals);

  // ref use
  const mealsSelected = useRef<MealsSelected>({
    mealTime: {
      snack: false,
      breakfast: false,
      dinner: false,
      lunch: false,
    },
    foodData: [],
  });

  // functions
  const handleSubmit = () => {
    setIsLoading(true);
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
    storeMealData(id!, {
      breakfast: mealsData.breakfast.concat(dtArray.breakfast),
      dinner: mealsData.dinner.concat(dtArray.dinner),
      lunch: mealsData.lunch.concat(dtArray.lunch),
      snack: mealsData.snack.concat(dtArray.snack),
    }).finally(() => {
      setIsLoading(false);
      setModalFalse();
    });
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
            {foodData.map((item, index) => (
              <FoodSelector
                foodItem={item}
                foodData={mealsSelected.current.foodData}
                key={index}
              />
            ))}
          </View>
        </TouchableOpacity>
      </ScrollView>
      <CustomButton
        title="Add"
        onPress={handleSubmit}
        parentStyle={styles.customButtonParent}
        isLoading={isLoading}
      />
    </View>
  );
};

export default ChooseFood;
