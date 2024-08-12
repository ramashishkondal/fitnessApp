// libs
import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, ScrollView, Platform} from 'react-native';

// 3rd party
import {LineChart, PieChart} from 'react-native-gifted-charts';
import AppleHealthKit from 'react-native-health';
import {readRecords} from 'react-native-health-connect';

// custom
import {useAppDispatch, useAppSelector} from '../../../Redux/Store';
import {
  DataInfoCompare,
  DescriptionText,
  PerformanceCard,
} from '../../../Components';
import {COLORS, ICONS, SIZES, SPACING, STRING} from '../../../Constants';
import InsidePieChart from '../../../Components/Molecules/InsidePieChart';
import {getPercentage, weekday} from '../../../Utils/commonUtils';
import {styles} from './styles';
import LineGraphLabel from '../../../Components/Molecules/LineGraphLabel';

const DailySteps: React.FC = () => {
  // constants

  // state use
  const [lineData, setLineData] = useState<
    Array<{value: number; week: string}>
  >([]);
  const [rating, setRating] = useState<{
    best: {value: number; week: string};
    worst: {value: number; week: string};
  }>();

  // redux use
  const {
    todaysSteps,
    nutrition,
    goal: {totalSteps},
  } = useAppSelector(state => state.health.value);
  const {healthConnectPermissions} = useAppSelector(
    state => state.settings.data,
  );
  const {createdOn} = useAppSelector(state => state.User.data);
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
      const dateAfter = () => {
        // Parse the createdOn date
        const accountCreationDate = new Date(createdOn);

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Calculate the date for exactly 7 days ago
        const pastWeek = new Date(today);
        pastWeek.setDate(today.getDate() - 7);

        // Compare the dates
        if (accountCreationDate >= pastWeek) {
          return accountCreationDate;
        }

        // Return the pastWeek date if createdOn is older than 7 days ago
        return pastWeek;
      };
      const startDate = dateAfter().toISOString();
      AppleHealthKit.getDailyStepCountSamples(
        {
          startDate: startDate,
          endDate: new Date().toISOString(),
        },
        (error, result) => {
          if (!error) {
            console.log('res is', result);
            const parsedRes = result.map(val => {
              return {
                value: Math.round(val.value),
                week: weekday[new Date(val.startDate).getDay()],
              };
            });

            const parsedReducer = parsedRes.reduce(
              (acc: {value: number; week: string}[], val) => {
                const index = acc.findIndex(v => v.week === val.week);

                if (index >= 0) {
                  // Update the existing object
                  acc[index].value += val.value;
                } else {
                  // Add the new object to the accumulator
                  acc.push(val);
                }

                return acc;
              },
              [],
            );

            setLineData(parsedReducer);
            const bestStepsDay = parsedReducer.reduce(
              (acc, val) => {
                if (val.value >= acc.value) {
                  return {
                    value: val.value,
                    week: val.week,
                  };
                }
                return acc;
              },
              {value: todaysSteps, week: 'Today'},
            );
            const worstStepsDay = parsedReducer.reduce(
              (acc, val) => {
                console.log('acc', acc, val);
                if (val.value <= acc.value) {
                  return {
                    value: val.value,
                    week: val.week,
                  };
                }
                return acc;
              },
              {value: todaysSteps, week: 'Today'},
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
        try {
          if (!healthConnectPermissions.steps) {
            return;
          }
          const dateAfter = () => {
            // Parse the createdOn date
            const accountCreationDate = new Date(createdOn);

            // Get today's date
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Calculate the date for exactly 7 days ago
            const pastWeek = new Date(today);
            pastWeek.setDate(today.getDate() - 7);

            // Compare the dates
            if (accountCreationDate >= pastWeek) {
              return accountCreationDate;
            }

            // Return the pastWeek date if createdOn is older than 7 days ago
            return pastWeek;
          };

          const startTimeForsteps = dateAfter();
          console.log('====================================');
          console.log('sadwdawdawd', startTimeForsteps);
          console.log('====================================');
          const stepsResRaw = await readRecords('Steps', {
            timeRangeFilter: {
              operator: 'between',
              startTime: startTimeForsteps.toISOString(),
              endTime: new Date().toISOString(),
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
              value: Math.round(val.steps),
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
            {value: todaysSteps, week: 'Today'},
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
            {value: todaysSteps, week: 'Today'},
          );

          setRating({
            best: bestStepsDay,
            worst: worstStepsDay,
          });
        } catch (e) {
          console.log('Error encountered - ', e);
        }
      };
      if (healthConnectPermissions.steps) {
        androidHealthSetup();
      }
    }
  }, [
    dispatch,
    totalSteps,
    healthConnectPermissions.steps,
    todaysSteps,
    createdOn,
  ]);

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
      {healthConnectPermissions.steps &&
      lineData?.some(val => val) &&
      lineData.length > 1 ? (
        <View style={styles.lineChartCtr}>
          <Text style={styles.lineChartHeadingText}>Statistics</Text>
          {lineData ? (
            <LineChart
              isAnimated
              curveType={1}
              adjustToWidth
              yAxisExtraHeight={10}
              curved
              // yAxisOffset={-19}
              // initialSpacing={0}
              data={lineData.slice().reverse()}
              areaChart
              startFillColor="#F8B631"
              endFillColor1="#FBDA95"
              hideDataPoints
              hideRules
              width={SIZES.width / 1.15}
              overflowBottom={-1}
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
                pointerLabelWidth: SIZES.width / 2.8,
                activatePointersOnLongPress: true,
                autoAdjustPointerLabelPosition: true,
                shiftPointerLabelX: 200,
                stripBehindBars: true,

                pointerLabelComponent: (
                  items: {value: number; week: string}[],
                ) => {
                  if (items[0].week && items[0].value) {
                    return LineGraphLabel({
                      day: items[0].week,
                      steps: items[0].value,
                      index: lineData
                        .slice()
                        .reverse()
                        .findIndex(val => val.week === items[0].week),
                      length: lineData.length,
                    });
                  }
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
            value={Math.round(rating.best.value)}
            performanceText="Best Performance"
          />
        )}
        {rating?.worst.value === Infinity ||
        rating === undefined ||
        rating.best.week === rating.worst.week ? null : (
          <PerformanceCard
            icon={ICONS.SmileyBad({width: 20, height: 20})}
            onDay={rating?.worst.week}
            value={Math.round(rating?.worst.value)}
            performanceText="Worst Performance"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default DailySteps;
