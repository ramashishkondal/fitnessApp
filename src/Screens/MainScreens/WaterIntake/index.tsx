// libs
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';

// custom
import {
  CustomGlass,
  DataInfoCompare,
  PerformanceCard,
  WarningLabel,
} from '../../../Components';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {COLORS, ICONS} from '../../../Constants';
import {styles} from './styles';
import {updateWaterIntake, firebaseDB} from '../../../Utils/userUtils';
import {weekday} from '../../../Utils/commonUtils';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {HealthData} from '../../../Defs';
import {updateHealthData} from '../../../Redux/Reducers/health';

const simleySize = {
  width: 21,
  height: 21,
  color: COLORS.SECONDARY.ORANGE,
};
const plusSize = {
  width: 15,
  height: 15,
};

const WaterIntake: React.FC = () => {
  // state use
  const [rating, setRating] = useState<{
    best: {value: number; week: string};
    worst: {value: number; week: string};
  }>();

  // redux use
  const {
    waterIntake,
    glassesLength,
    goal: {noOfGlasses, totalCalorie, totalSteps},
  } = useAppSelector(state => state.health.value);
  const {id} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();
  // const [glassesLength, setGlassesLength] = useState<number>(
  //   waterIntake > noOfGlasses ? waterIntake : noOfGlasses,
  // );

  console.log('ed', id);

  // effect use
  useEffect(() => {
    if (waterIntake <= noOfGlasses) {
      dispatch(updateHealthData({glassesLength: noOfGlasses}));
    } else if (waterIntake > glassesLength) {
      dispatch(updateHealthData({glassesLength: waterIntake}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    firestore()
      .collection(firebaseDB.collections.healthData)
      .doc(id!)
      .get()
      .then(healthData => {
        const filteredData: HealthData[] = Object.values(
          healthData.data() ?? [],
        );

        console.log('filtered ata ', filteredData, 'ee');

        const bestWaterIntakeDay = filteredData.reduce(
          (acc, val) => {
            const currentDate = new Date(val.currentDate);
            if (val.waterIntake >= acc.value) {
              return {
                value: val.waterIntake,
                week:
                  currentDate.toDateString() === new Date().toDateString()
                    ? 'today'
                    : weekday[currentDate.getDay()],
              };
            }
            return acc;
          },
          {value: -Infinity, week: 'No data'},
        );
        const worstWaterIntakeDay = filteredData.reduce(
          (acc, val) => {
            const currentDate = new Date(val.currentDate);
            console.log(
              'acc is',
              acc,
              currentDate.toDateString(),
              new Date().toDateString(),
            );
            if (val.waterIntake <= acc.value) {
              return {
                value: val.waterIntake,
                week:
                  currentDate.toDateString() === new Date().toDateString()
                    ? 'today'
                    : weekday[currentDate.getDay()],
              };
            }
            return acc;
          },
          {
            value: +Infinity,
            week: 'No data',
          },
        );
        setRating({best: bestWaterIntakeDay, worst: worstWaterIntakeDay});
      });
  }, [dispatch, id, waterIntake]);

  // memo use
  const glasses = useMemo(
    () =>
      Array(glassesLength)
        .fill(true, 0, waterIntake + 1)
        .fill(false, waterIntake),
    [glassesLength, waterIntake],
  );

  // functions
  const handleGlassDrank = (i: number) => {
    updateWaterIntake(id!, i + 1, {totalCalorie, totalSteps, noOfGlasses});
  };
  const handleGlassEmpty = (i: number) => {
    if (waterIntake === 1 && i === 0) {
      updateWaterIntake(id!, 0, {totalCalorie, totalSteps, noOfGlasses});
      return;
    }
    updateWaterIntake(id!, i + 1, {totalCalorie, totalSteps, noOfGlasses});
  };

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.titleText}>
        You drank{' '}
        <Text style={styles.highlightedText}>{waterIntake} glasses</Text> today
      </Text>
      <View style={styles.glassesCtr}>
        {glasses.map((val, i) => {
          return (
            <CustomGlass
              isFilled={val}
              handleOnPress={() => handleGlassDrank(i)}
              handleDelete={() => handleGlassEmpty(i)}
              key={i}
            />
          );
        })}
        <TouchableOpacity
          onPress={() => {
            dispatch(updateHealthData({glassesLength: glassesLength + 1}));
          }}
          style={styles.plusCtr}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
          {ICONS.Plus(plusSize)}
        </TouchableOpacity>
      </View>
      <View>
        <DataInfoCompare
          doneItems={waterIntake * 250}
          total={noOfGlasses}
          doneItemsInfoName="Water Drank"
          doneItemsSuffix="ml"
          totalSuffix="glasses"
          totalInfoName="Daily Goal"
        />
        {waterIntake < noOfGlasses ? (
          <WarningLabel text="You didn't drink enough water for today." />
        ) : null}
      </View>
      {rating === undefined || rating.worst.value === +Infinity ? null : (
        <PerformanceCard
          icon={ICONS.SmileyGood(simleySize)}
          performanceText="Best Performance"
          onDay={rating?.best.week ?? 'No Data'}
          value={rating?.best.value ?? 0}
        />
      )}
      {rating === undefined || rating.worst.value === +Infinity ? null : (
        <PerformanceCard
          icon={ICONS.SmileyBad(simleySize)}
          performanceText="Worst Performance"
          onDay={rating?.worst.week ?? 'No data'}
          value={rating?.worst.value ?? 0}
        />
      )}
    </ScrollView>
  );
};

export default WaterIntake;
