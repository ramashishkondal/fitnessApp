// libs
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, ScrollView, Platform} from 'react-native';

// 3rd party
import {LineChart, PieChart} from 'react-native-gifted-charts';
import AppleHealthKit from 'react-native-health';
import {PERMISSIONS, check, request} from 'react-native-permissions';
import {readRecords} from 'react-native-health-connect';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {
  DataInfoCompare,
  DescriptionText,
  PerformanceCard,
} from '../../../Components';
import {COLORS, ICONS, SPACING, STRING} from '../../../Constants';
import InsidePieChart from '../../../Components/Molecules/InsidePieChart';
import {date, getPercentage, weekday} from '../../../Utils/commonUtils';
import {styles} from './styles';
import LineGraphLabel from '../../../Components/Molecules/LineGraphLabel';

const DailySteps: React.FC = () => {
  // constants

  // state use
  const [lineData, setLineData] = useState<Array<{value: number}>>([]);
  const [rating, setRating] = useState<{
    best: {value: number; week: string};
    worst: {value: number; week: string};
  }>();

  // redux use
  const {
    todaysSteps,
    nutrition,
    hasPermission,
    goal: {totalSteps},
  } = useAppSelector(state => state.health.value);
  const dispatch = useAppDispatch();

  // state dependent constants
  const stepsCompletionPercentage = Math.ceil(
    getPercentage(todaysSteps, totalSteps),
  );
  const pieData = [
    {value: stepsCompletionPercentage, color: COLORS.PRIMARY.PURPLE},
    {value: 100 - stepsCompletionPercentage, color: COLORS.SECONDARY.WHITE},
  ];

  // effect use
  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleHealthKit.getDailyStepCountSamples(
        {
          startDate: new Date(
            date.today().getFullYear(),
            date.today().getMonth(),
            date.today().getDate() - 6,
          ).toISOString(),
          endDate: new Date(
            date.today().getFullYear(),
            date.today().getMonth(),
            date.today().getDate(),
          ).toISOString(),
        },
        (error, result) => {
          if (!error) {
            console.log('res is', result);

            setLineData(
              result.map(val => {
                console.log('val', val);
                return {
                  value: val.value,
                  week: weekday[new Date(val.startDate).getDay()],
                };
              }),
            );
            const bestStepsDay = result.reduce(
              (acc, val) => {
                if (val.value >= acc.value) {
                  return {
                    value: val.value,
                    week: weekday[new Date(val.startDate).getDay()],
                  };
                }
                return acc;
              },
              {value: -Infinity, week: ''},
            );
            const worstStepsDay = result.reduce(
              (acc, val) => {
                console.log('acc', acc, val);
                if (val.value <= acc.value) {
                  return {
                    value: val.value,
                    week: weekday[new Date(val.startDate).getDay()],
                  };
                }
                return acc;
              },
              {value: +Infinity, week: ''},
            );
            setRating({
              best: bestStepsDay,
              worst: worstStepsDay,
            });

            return;
          }
          console.log('error - ', error);
        },
      );
    } else {
      const androidHealthSetup = async () => {
        console.log('android setup start');
        try {
          const authority = await check(
            PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
          );
          if (authority === 'denied') {
            await request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION);
          }
          const stepsResRaw = await readRecords('Steps', {
            timeRangeFilter: {
              operator: 'between',
              startTime: new Date(
                date.today().getFullYear(),
                date.today().getMonth(),
                date.today().getDate() - 7,
              ).toISOString(),
              endTime: new Date(
                date.today().getFullYear(),
                date.today().getMonth(),
                date.today().getDate(),
              ).toISOString(),
            },
          });

          console.log(
            'stepRes new is ',
            Object.values(
              stepsResRaw.reduce(
                (
                  acc: {
                    [key: string]: {
                      steps: number;
                      startTime: string;
                    };
                  },
                  val,
                ) => {
                  if (new Date(val.startTime).toDateString() in acc) {
                    acc[new Date(val.startTime).toDateString()].steps +=
                      val.count;
                  } else {
                    acc[new Date(val.startTime).toDateString()] = {
                      steps: val.count,
                      startTime: val.startTime,
                    };
                  }
                  return acc;
                },
                {},
              ),
            ),
          );

          const stepsResult = Object.values(
            stepsResRaw.reduce(
              (
                acc: {
                  [key: string]: {
                    steps: number;
                    startTime: string;
                  };
                },
                val,
              ) => {
                if (new Date(val.startTime).toDateString() in acc) {
                  acc[new Date(val.startTime).toDateString()].steps +=
                    val.count;
                } else {
                  acc[new Date(val.startTime).toDateString()] = {
                    steps: val.count,
                    startTime: val.startTime,
                  };
                }
                return acc;
              },
              {},
            ),
          );

          setLineData(
            stepsResult.map(val => ({
              value: val.steps,
              week: weekday[new Date(val.startTime).getDay()],
            })),
          );

          const bestStepsDay = stepsResult.reduce(
            (acc, val) => {
              if (val.steps >= acc.value) {
                return {
                  value: val.steps,
                  week: weekday[new Date(val.startTime).getDay()],
                };
              }
              return acc;
            },
            {value: -Infinity, week: ''},
          );

          const worstStepsDay = stepsResult.reduce(
            (acc, val) => {
              if (val.steps <= acc.value) {
                return {
                  value: val.steps,
                  week: weekday[new Date(val.startTime).getDay()],
                };
              }
              return acc;
            },
            {value: +Infinity, week: ''},
          );

          setRating({
            best: bestStepsDay,
            worst: worstStepsDay,
          });
        } catch (e) {
          console.log('Error encountered - ', e);
        }
      };
      if (hasPermission) {
        androidHealthSetup();
      }
    }
  }, [dispatch, totalSteps, hasPermission]);

  // callback use
  const centerLabelComponent = useCallback(() => {
    return (
      <InsidePieChart
        value={stepsCompletionPercentage}
        suffix="%"
        text="of daily goal"
      />
    );
  }, [stepsCompletionPercentage]);

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.titleText}>
        {STRING.DAILY_STEPS.TITLE[1]}{' '}
        <Text style={styles.stepCountText}>{todaysSteps}</Text>{' '}
        {STRING.DAILY_STEPS.TITLE[2]}
      </Text>
      <View style={styles.pieChartCtr}>
        <PieChart
          donut
          isAnimated
          radius={100}
          innerRadius={92}
          innerCircleColor={COLORS.PRIMARY.LIGHT_GREY}
          data={pieData}
          centerLabelComponent={centerLabelComponent}
        />
      </View>
      <DataInfoCompare
        doneItems={nutrition}
        total={totalSteps}
        doneItemsInfoName="Cal Burned"
        totalInfoName="Daily Goal"
        parentStyle={SPACING.mtMedium}
      />
      {hasPermission && lineData?.some(val => val) ? (
        <View style={styles.lineChartCtr}>
          <Text style={styles.lineChartHeadingText}>Statistics</Text>
          {lineData ? (
            <LineChart
              isAnimated
              adjustToWidth
              curved
              // yAxisOffset={-15.5}
              // initialSpacing={0}
              data={lineData.slice().reverse()}
              hideOrigin
              areaChart
              startFillColor="#F8B631"
              endFillColor1="#FBDA95"
              hideDataPoints
              hideRules
              thickness={4}
              yAxisTextStyle={{color: COLORS.SECONDARY.GREY}}
              yAxisColor="#ffff"
              xAxisColor="#ffff"
              color="#F7A608"
              disableScroll
              onlyPositive
              pointerConfig={{
                stripOverPointer: true,
                pointerStripHeight: 190,
                pointerStripColor: 'lightgray',
                pointerStripWidth: 2,
                pointerColor: 'lightgray',
                pointerLabelWidth: 100,
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: true,
                pointerLabelComponent: (
                  items: {value: number; week: string}[],
                ) => {
                  return LineGraphLabel({
                    day: items[0].week,
                    steps: items[0].value,
                  });
                },
              }}
            />
          ) : null}
        </View>
      ) : (
        <DescriptionText
          text="No Data History Available"
          textStyle={SPACING.mt3}
        />
      )}
      <View style={SPACING.mV3}>
        {rating === undefined || rating?.best.value === -Infinity ? null : (
          <PerformanceCard
            icon={ICONS.SmileyGood({
              width: 20,
              height: 20,
              color: COLORS.SECONDARY.ORANGE,
            })}
            onDay={rating.best.week}
            value={rating.best.value}
            performanceText="Best Performance"
          />
        )}
        {rating?.worst.value === Infinity || rating === undefined ? null : (
          <PerformanceCard
            icon={ICONS.SmileyBad({width: 20, height: 20})}
            onDay={rating?.worst.week}
            value={rating?.worst.value}
            performanceText="Worst Performance"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default DailySteps;
