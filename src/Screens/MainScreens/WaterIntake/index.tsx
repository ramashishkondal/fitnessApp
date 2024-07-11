// libs
import React, {useEffect, useMemo, useState} from 'react';
import {View, Text} from 'react-native';

// custom
import {
  CustomGlass,
  DataInfoCompare,
  PerformanceCard,
  WarningLabel,
} from '../../../Components';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {updateHealthData} from '../../../Redux/Reducers/health';
import {COLORS, ICONS} from '../../../Constants';
import {styles} from './styles';
import {getHealthData, updateWaterIntake} from '../../../Utils/userUtils';
import {
  checkWeek,
  date,
  getPercentage,
  weekday,
} from '../../../Utils/commonUtils';
import {Timestamp} from '@react-native-firebase/firestore';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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
    goal: {noOfGlasses},
  } = useAppSelector(state => state.health.value);
  const {id} = useAppSelector(state => state.User.data);
  const dispatch = useAppDispatch();

  const [glassesLength, setGlassesLength] = useState<number>(
    waterIntake > noOfGlasses ? waterIntake : noOfGlasses,
  );
  // effect use
  useEffect(() => {
    const today = date.today();
    getHealthData(id!)
      .then(healthData => {
        console.log('health Data is', healthData);
        if (healthData) {
          const filteredData = healthData.filter(val =>
            checkWeek(
              Timestamp.fromMillis(val.currentDate.seconds * 1000).toDate(),
              today,
              false,
            ),
          );
          const bestWaterIntakeDay = filteredData.reduce(
            (acc, val) => {
              const currentDate = Timestamp.fromMillis(
                val.currentDate.seconds * 1000,
              ).toDate();
              if (
                Math.ceil(
                  getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10,
                ) >= acc.value
              ) {
                return {
                  value: Math.ceil(
                    getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10,
                  ),
                  week: weekday[currentDate.getDay()],
                };
              }
              return acc;
            },
            {value: waterIntake, week: 'today'},
          );
          const worstWaterIntakeDay = filteredData.reduce(
            (acc, val) => {
              const currentDate = Timestamp.fromMillis(
                val.currentDate.seconds * 1000,
              ).toDate();
              console.log(weekday[currentDate.getDay()], currentDate);
              if (
                Math.ceil(
                  getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10,
                ) <= acc.value
              ) {
                return {
                  value: Math.ceil(
                    getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10,
                  ),
                  week: weekday[currentDate.getDay()],
                };
              }
              return acc;
            },
            {
              value: waterIntake,
              week: 'today',
            },
          );
          setRating({best: bestWaterIntakeDay, worst: worstWaterIntakeDay});
        }
      })
      .catch(e =>
        console.log('error encountered in getting user health info', e),
      );
  }, [id, waterIntake]);

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
    updateWaterIntake(id!, i + 1);
    dispatch(updateHealthData({waterIntake: i + 1}));
  };
  const handleGlassEmpty = (i: number) => {
    updateWaterIntake(id!, i + 1);

    setGlassesLength(i + 1 <= noOfGlasses ? noOfGlasses : i + 1);

    dispatch(updateHealthData({waterIntake: i + 1}));
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
            setGlassesLength(glassesLength + 1);
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
          <WarningLabel text="You didn't drink enough water for today" />
        ) : null}
      </View>
      {rating === undefined ? null : (
        <PerformanceCard
          icon={ICONS.SmileyGood(simleySize)}
          performanceText="Best Performance"
          onDay={rating?.best.week ?? 'No Data'}
          value={rating?.best.value ?? 0}
        />
      )}
      {rating === undefined ? null : (
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
