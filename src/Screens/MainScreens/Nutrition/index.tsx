// libs
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, ScrollView} from 'react-native';

// 3rd party
import {PieChart} from 'react-native-gifted-charts';

// custom
import {
  NutritionHeaderRight,
  WithModal,
  PieChartInfoItem,
  NutritionStats,
  DietDataFlatList,
  ChooseFood,
} from '../../../Components';
import {COLORS, STRING} from '../../../Constants';
import {NutritionProps} from '../../../Defs/navigators';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {getPercentage} from '../../../Utils/commonUtils';
import DeviceInfo from 'react-native-device-info';

const Nutrition: React.FC<NutritionProps> = ({navigation}) => {
  // state use
  const [modalVisible, setModalVisible] = useState(false);

  // redux use
  const {nutrition: caloriesBurned} = useAppSelector(
    state => state.health.value,
  );
  const dispatch = useAppDispatch();
  const {data: dailyMeals} = useAppSelector(state => state.dailyMeals);

  const statsData = useMemo(
    () =>
      Object.values(dailyMeals)
        .flat()
        .reduce(
          (acc, val) => ({
            calories: parseFloat(
              (val.carbs * 4 + val.fat * 9 + val.protein * 4 > val.calories
                ? val.carbs * 4 + val.fat * 9 + val.protein * 4 + acc.calories
                : val.calories + acc.calories
              ).toFixed(1),
            ),
            carbs: parseFloat((val.carbs + acc.carbs).toFixed(1)),
            fat: parseFloat((val.fat + acc.fat).toFixed(1)),
            protein: parseFloat((val.protein + acc.protein).toFixed(1)),
          }),
          {
            calories: 0,
            carbs: 0,
            fat: 0,
            protein: 0,
          },
        ),
    [dailyMeals],
  );

  const proteinData = [
    {
      value: parseFloat(
        getPercentage(statsData.protein * 4, statsData.calories).toFixed(1),
      ),
      color: COLORS.SECONDARY.CYAN,
    },
    {
      value:
        100 -
        parseFloat(
          getPercentage(statsData.protein * 4, statsData.calories).toFixed(1),
        ),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];
  const carbsData = [
    {
      value: parseFloat(
        getPercentage(statsData.carbs * 4, statsData.calories).toFixed(1),
      ),
      color: COLORS.PRIMARY.PURPLE,
    },
    {
      value:
        100 -
        parseFloat(
          getPercentage(statsData.carbs * 4, statsData.calories).toFixed(1),
        ),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];
  const fatData = [
    {
      value: parseFloat(
        getPercentage(statsData.fat * 9, statsData.calories).toFixed(1),
      ),
      color: COLORS.SECONDARY.ORANGE,
    },
    {
      value:
        100 -
        parseFloat(
          getPercentage(statsData.fat * 9, statsData.calories).toFixed(1),
        ),
      color: COLORS.PRIMARY.LIGHT_PURPLE,
    },
  ];

  // functions
  const handleOnPress = () => setModalVisible(true);
  const headerRight = useCallback(
    () => <NutritionHeaderRight handleOnPress={handleOnPress} />,
    [],
  );

  // effect use
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [dispatch, headerRight, navigation]);

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.titleText}>
        {STRING.NUTRITION.TITLE[1]}{' '}
        <Text style={styles.calorieText}>{Math.round(caloriesBurned)}</Text>{' '}
        {STRING.NUTRITION.TITLE[2]}
      </Text>
      <View style={styles.childCtr}>
        <View style={styles.pieChart}>
          <View style={styles.pieChartTop}>
            <PieChart
              donut
              showText
              radius={DeviceInfo.isTablet() ? 120 : 80}
              innerRadius={DeviceInfo.isTablet() ? 100 : 65}
              data={proteinData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={styles.pieChartInside}>
            <PieChart
              donut
              showText
              radius={DeviceInfo.isTablet() ? 95 : 60}
              innerRadius={DeviceInfo.isTablet() ? 75 : 45}
              data={carbsData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
            />
          </View>
          <View style={styles.pieChartInside}>
            <PieChart
              donut
              showText
              radius={DeviceInfo.isTablet() ? 70 : 40}
              innerRadius={DeviceInfo.isTablet() ? 50 : 25}
              data={fatData}
              innerCircleColor={COLORS.PRIMARY.DARK_GREY}
              edgesRadius={120}
            />
          </View>
        </View>
        <View>
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.PROTEIN}
            percentage={proteinData[0].value}
            color={COLORS.SECONDARY.CYAN}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.CARB}
            percentage={carbsData[0].value}
            color={COLORS.PRIMARY.PURPLE}
          />
          <PieChartInfoItem
            item={STRING.NUTRITION.NUTRITION_STATS.FAT}
            percentage={fatData[0].value}
            color={COLORS.SECONDARY.ORANGE}
          />
        </View>
      </View>
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.PROTEIN,
          percentage: proteinData[0].value,
          quantity: statsData.protein,
          color: COLORS.SECONDARY.CYAN,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.CARB,
          percentage: carbsData[0].value,
          quantity: statsData.carbs,
          color: COLORS.PRIMARY.PURPLE,
        }}
      />
      <View style={styles.line} />
      <NutritionStats
        item={{
          title: STRING.NUTRITION.NUTRITION_STATS.FAT,
          percentage: fatData[0].value,
          quantity: statsData.fat,
          color: COLORS.SECONDARY.ORANGE,
        }}
      />
      <WithModal
        modalVisible={modalVisible}
        setModalFalse={() => setModalVisible(false)}>
        <ChooseFood setModalFalse={() => setModalVisible(false)} />
      </WithModal>
      <DietDataFlatList />
    </ScrollView>
  );
};

export default Nutrition;
