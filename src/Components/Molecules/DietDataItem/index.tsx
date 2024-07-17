// libs
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

// custom
import {COLORS, ICONS, SIZES} from '../../../Constants';
import {DietDataItemProps} from './types';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {Meal, resetMealDataItems} from '../../../Redux/Reducers/dailyMeal';
import {FONT_FAMILY} from '../../../Constants/commonStyles';
import {Swipeable} from 'react-native-gesture-handler';
import {storeMealData} from '../../../Utils/userUtils';
import {useNetInfo} from '@react-native-community/netinfo';
import {useRealm} from '@realm/react';
import {MealDb} from '../../../DbModels/mealData';
import {UpdateMode} from 'realm';

const DietDataItem = ({item, timeOfMeal}: DietDataItemProps) => {
  // redux use
  const {data: mealsData} = useAppSelector(state => state.dailyMeals);
  const {id} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  // netInfo use
  const netInfo = useNetInfo();

  // realm use
  const realm = useRealm();

  // functions
  const handleClose = () => {
    switch (timeOfMeal) {
      case 'Breakfast':
        if (netInfo.isConnected) {
          storeMealData(id!, {...mealsData, breakfast: []});
        } else {
          realm.write(() => {
            realm.create(
              MealDb,
              {...mealsData, breakfast: [], uid: id!},
              UpdateMode.Modified,
            );
          });
          dispatch(resetMealDataItems({...mealsData, breakfast: []}));
        }
        break;
      case 'Snack':
        if (netInfo.isConnected) {
          storeMealData(id!, {...mealsData, snack: []});
        } else {
          realm.write(() => {
            realm.create(
              MealDb,
              {...mealsData, snack: [], uid: id!},
              UpdateMode.Modified,
            );
          });
          dispatch(resetMealDataItems({...mealsData, snack: []}));
        }
        break;
      case 'Lunch':
        if (netInfo.isConnected) {
          storeMealData(id!, {...mealsData, lunch: []});
        } else {
          realm.write(() => {
            realm.create(
              MealDb,
              {...mealsData, lunch: [], uid: id!},
              UpdateMode.Modified,
            );
          });
          dispatch(resetMealDataItems({...mealsData, lunch: []}));
        }
        break;
      case 'Dinner':
        if (netInfo.isConnected) {
          storeMealData(id!, {...mealsData, dinner: []});
        } else {
          realm.write(() => {
            realm.create(
              MealDb,
              {...mealsData, dinner: [], uid: id!},
              UpdateMode.Modified,
            );
          });
          dispatch(resetMealDataItems({...mealsData, dinner: []}));
        }
        break;
    }
  };
  if (item.length === 0) {
    return null;
  }
  const rightSwipeActions = (name: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteCtr}
        onPress={() => {
          console.log('delete pressed');
          const filteredItems = item.filter(val => val.name !== name);
          switch (timeOfMeal) {
            case 'Breakfast':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  breakfast: filteredItems,
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      breakfast: filteredItems,
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    breakfast: filteredItems,
                  }),
                );
              }

              break;
            case 'Snack':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  snack: filteredItems,
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      snack: filteredItems,
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    snack: filteredItems,
                  }),
                );
              }
              break;
            case 'Lunch':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  lunch: filteredItems,
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      lunch: filteredItems,
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    lunch: filteredItems,
                  }),
                );
              }
              break;
            case 'Dinner':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  dinner: filteredItems,
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      dinner: filteredItems,
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    dinner: filteredItems,
                  }),
                );
              }
              break;
          }
        }}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

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
          <Swipeable
            renderRightActions={() => rightSwipeActions(val.data.name)}
            key={val.data.id}>
            <View
              style={[
                styles.childCtr,
                index !== 0 && index !== arr.length ? styles.childCtrTop : null,
              ]}>
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
          </Swipeable>
        );
      })}
      <TouchableOpacity style={styles.closeCtr} onPress={handleClose}>
        <View>{ICONS.Close({width: 35, height: 35})}</View>
      </TouchableOpacity>
    </View>
  );
};

export default DietDataItem;
