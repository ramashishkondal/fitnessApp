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
        style={{
          backgroundColor: COLORS.SECONDARY.RED,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 16,
          width: 100,
          marginHorizontal: 8,
          marginVertical: 8,
        }}
        onPress={() => {
          console.log('delete pressed');
          switch (timeOfMeal) {
            case 'Breakfast':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  breakfast: item.filter(val => val.name !== name),
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      breakfast: item.filter(val => val.name !== name),
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    breakfast: item.filter(val => val.name !== name),
                  }),
                );
              }

              break;
            case 'Snack':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  snack: item.filter(val => val.name !== name),
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      snack: item.filter(val => val.name !== name),
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    snack: item.filter(val => val.name !== name),
                  }),
                );
              }
              break;
            case 'Lunch':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  lunch: item.filter(val => val.name !== name),
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      lunch: item.filter(val => val.name !== name),
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    lunch: item.filter(val => val.name !== name),
                  }),
                );
              }
              break;
            case 'Dinner':
              if (netInfo.isConnected) {
                storeMealData(id!, {
                  ...mealsData,
                  dinner: item.filter(val => val.name !== name),
                });
              } else {
                realm.write(() => {
                  realm.create(
                    MealDb,
                    {
                      ...mealsData,
                      dinner: item.filter(val => val.name !== name),
                      uid: id!,
                    },
                    UpdateMode.Modified,
                  );
                });
                dispatch(
                  resetMealDataItems({
                    ...mealsData,
                    dinner: item.filter(val => val.name !== name),
                  }),
                );
              }
              break;
          }
        }}>
        <Text
          style={{
            color: COLORS.SECONDARY.WHITE,
            fontWeight: 'bold',
            paddingHorizontal: 8,
            fontFamily: FONT_FAMILY.REGULAR,
            fontSize: SIZES.font14,
          }}>
          Delete
        </Text>
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
