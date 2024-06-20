// libs
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import { LineChart, PieChart, lineDataItem } from "react-native-gifted-charts";
import AppleHealthKit, { HealthValue } from "react-native-health";

// custom
import { useAppSelector } from "../../../Redux/Store";
import { DataInfoCompare, PerformanceCard } from "../../../Components";
import { COLORS, ICONS, SIZES, SPACING, STRING } from "../../../Constants";
import InsidePieChart from "../../../Components/Molecules/InsidePieChart";
import {
  checkWeek,
  date,
  getPercentage,
  weekday,
} from "../../../Utils/commonUtils";
import { styles } from "./styles";
import { getHealthData } from "../../../Utils/userUtils";
import { Timestamp } from "@react-native-firebase/firestore";

const DailySteps: React.FC = () => {
  // constants
  const today = date.today();

  // state use
  const [lineData, setLineData] = useState<Array<{ value: number }>>([]);
  const [rating, setRating] = useState<{
    best: { value: number; week: string };
    worst: { value: number; week: string };
  }>();

  // redux use
  const {
    todaysSteps,
    nutrition,
    goal: { totalSteps, totalCalorie },
  } = useAppSelector((state) => state.health.value);
  const { id } = useAppSelector((state) => state.User.data);

  // state dependent constants
  const stepsCompletionPercentage = ~~getPercentage(todaysSteps, totalSteps);
  const pieData = [
    { value: stepsCompletionPercentage, color: COLORS.PRIMARY.PURPLE },
    { value: 100 - stepsCompletionPercentage, color: COLORS.SECONDARY.WHITE },
  ];

  // effect use
  useEffect(() => {
    getHealthData(id!)
      .then((healthData) => {
        if (healthData) {
          const filteredData = healthData.filter((val) =>
            checkWeek(
              Timestamp.fromMillis(val.currentDate.seconds * 1000).toDate(),
              today
            )
          );

          setLineData(
            filteredData.map((val) => ({
              value: ~~getPercentage(val.todaysSteps, val.goal.totalSteps),
            }))
          );
          const bestWaterIntakeDay = filteredData.reduce(
            (acc, val) => {
              if (
                Math.ceil(
                  getPercentage(val.todaysSteps, val.goal.totalSteps) / 10
                ) >= acc.value
              ) {
                return {
                  value: Math.ceil(
                    getPercentage(val.todaysSteps, val.goal.totalSteps) / 10
                  ),
                  week:
                    weekday[
                      Timestamp.fromMillis(val.currentDate.seconds * 1000)
                        .toDate()
                        .getDay()
                    ],
                };
              }
              return acc;
            },
            { value: -Infinity, week: "" }
          );
          const worstWaterIntakeDay = filteredData.reduce(
            (acc, val) => {
              if (
                Math.ceil(
                  getPercentage(val.todaysSteps, val.goal.totalSteps) / 10
                ) <= acc.value
              ) {
                return {
                  value: Math.ceil(
                    getPercentage(val.todaysSteps, val.goal.totalSteps) / 10
                  ),
                  week:
                    weekday[
                      Timestamp.fromMillis(val.currentDate.seconds * 1000)
                        .toDate()
                        .getDay()
                    ],
                };
              }
              return acc;
            },
            {
              value: +Infinity,
              week: "",
            }
          );
          setRating({ best: bestWaterIntakeDay, worst: worstWaterIntakeDay });
        }
      })
      .catch((e) =>
        console.log(
          "error encounterd fetching health data in daily steps - ",
          e
        )
      );
  }, []);

  // callback use
  const centerLabelComponent = useCallback(() => {
    return <InsidePieChart percentage={stepsCompletionPercentage} />;
  }, [stepsCompletionPercentage]);

  return (
    <ScrollView style={styles.parent}>
      <Text style={styles.titleText}>
        {STRING.DAILY_STEPS.TITLE[1]}{" "}
        <Text style={styles.stepCountText}>{todaysSteps}</Text>{" "}
        {STRING.DAILY_STEPS.TITLE[2]}
      </Text>
      <View style={{ alignSelf: "center" }}>
        <PieChart
          donut
          isAnimated
          radius={100}
          innerRadius={85}
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
      <View style={{ backgroundColor: "white", paddingHorizontal: 8 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: SIZES.font17,
            marginVertical: 32,
          }}
        >
          Statistics
        </Text>
        <LineChart
          isAnimated
          adjustToWidth
          curved
          yAxisOffset={-27.5}
          initialSpacing={0}
          data={lineData}
          hideOrigin
          areaChart
          startFillColor="#F8B631"
          endFillColor1="#FBDA95"
          hideDataPoints
          hideRules
          thickness={4}
          yAxisTextStyle={{ color: COLORS.SECONDARY.GREY }}
          yAxisColor="#ffff"
          xAxisColor="#ffff"
          color="#F7A608"
          disableScroll
          onlyPositive
        />
      </View>
      <View style={SPACING.mV3}>
        {rating === undefined || rating?.best.value === -Infinity ? null : (
          <PerformanceCard
            icon={ICONS.SmileyGood({
              width: 20,
              height: 20,
              color: COLORS.SECONDARY.ORANGE,
            })}
            onDay={rating?.best.week ?? "No data"}
            value={rating?.best.value ?? 0}
            performanceText="Best Performance"
          />
        )}
        {rating === undefined || rating?.worst.value === Infinity ? null : (
          <PerformanceCard
            icon={ICONS.SmileyBad({ width: 20, height: 20 })}
            onDay={rating?.worst.week ?? "No data"}
            value={rating?.worst.value ?? "No data"}
            performanceText="Best Performance"
          />
        )}
      </View>
    </ScrollView>
  );
};

export default DailySteps;
