// libs
import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, Text, Platform} from 'react-native';

// custom
import {
  CustomButton,
  CustomTextInput,
  DescriptionText,
  HeadingText,
} from '../../Atoms';
import {ChooseFoodProps} from './types';
import {ICONS} from '../../../Constants';
import MealSelector from '../MealSelector';
import FoodSelector from '../FoodSelector';
import {
  DailyMeals,
  Meal,
  resetMealDataItems,
} from '../../../Redux/Reducers/dailyMeal';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {styles} from './styles';
import {foodData as FOOD_DATA} from '../../../Constants/commonConstants';
import {storeMealData} from '../../../Utils/userUtils';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {MealDb} from '../../../DbModels/mealData';
import {UpdateMode} from 'realm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ToastError from '../../Atoms/ToastError';

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
  const [search, setSearch] = useState('');
  const [foodData, setFoodData] = useState(
    FOOD_DATA.map(val => ({...val, isSelected: false})),
  );

  // netInfo use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // redux use
  const {id} = useAppSelector(state => state.User.data);
  const {data: mealsData} = useAppSelector(state => state.dailyMeals);
  const dispatch = useAppDispatch();

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
      ToastError('Error', 'Please select a Meal category.');
      return;
    }
    if (mealsSelected.current.foodData.length === 0) {
      ToastError('Error', 'No food to add selected.');
      return;
    }
    if (netInfo.isConnected) {
      setIsLoading(true);
      storeMealData(id!, {
        breakfast: mealsData.breakfast.concat(dtArray.breakfast),
        dinner: mealsData.dinner.concat(dtArray.dinner),
        lunch: mealsData.lunch.concat(dtArray.lunch),
        snack: mealsData.snack.concat(dtArray.snack),
      }).finally(() => {
        setIsLoading(false);
        setModalFalse();
      });
    } else {
      realm.write(() => {
        realm.create(
          MealDb,
          {
            breakfast: mealsData.breakfast
              .concat(dtArray.breakfast)
              .filter(val => val),
            dinner: mealsData.dinner.concat(dtArray.dinner).map(val => val),
            lunch: mealsData.lunch.concat(dtArray.lunch).map(val => val),
            snack: mealsData.snack.concat(dtArray.snack).map(val => val),
            uid: id!,
          },
          UpdateMode.Modified,
        );
      });
      dispatch(
        resetMealDataItems({
          breakfast: mealsData.breakfast.concat(dtArray.breakfast),
          dinner: mealsData.dinner.concat(dtArray.dinner),
          lunch: mealsData.lunch.concat(dtArray.lunch),
          snack: mealsData.snack.concat(dtArray.snack),
        }),
      );
      setModalFalse();
      setIsLoading(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={styles.parent}
        // extraScrollHeight={400}
        extraHeight={Platform.OS === 'ios' ? 500 : 400}
        enableOnAndroid={true}>
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
              title="Breakfast"
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
          </View>
          <CustomTextInput
            placeHolder="Search Food Items"
            icon={ICONS.Search({height: 25, width: 25})}
            parentStyle={styles.customTextInputParent}
            onChangeText={e => {
              setSearch(e);
            }}
          />
          <View style={styles.foodCtr}>
            {foodData
              .filter(val => val.name.toLowerCase().includes(search))
              .map((item, index) => (
                <FoodSelector
                  foodItem={item}
                  foodData={mealsSelected.current.foodData}
                  setFoodData={setFoodData}
                  key={index}
                />
              ))}
            {foodData.filter(val => val.name.toLowerCase().includes(search))
              .length === 0 ? (
              <Text style={styles.noResultText}>No results found</Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <CustomButton
        title="Add"
        onPress={handleSubmit}
        parentStyle={styles.customButtonParent}
        isLoading={isLoading}
      />
    </>
  );
};

export default ChooseFood;
