// libs
import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import { LineChart, PieChart } from "react-native-gifted-charts";
import AppleHealthKit, { HealthValue } from "react-native-health";

// custom
import { useAppSelector } from "../../../Redux/Store";
import { DataInfoCompare, PerformanceCard } from "../../../Components";
import { COLORS, ICONS, SIZES, SPACING, STRING } from "../../../Constants";
import InsidePieChart from "../../../Components/Molecules/InsidePieChart";
import { date, getPercentage } from "../../../Utils/commonUtils";
import { styles } from "./styles";

const DailySteps: React.FC = () => {
  // constants
  const today = date.today();
  const todayMidnight = date.getStartOfDay(today);

  // state use
  const [lineData, setLineData] = useState<HealthValue[]>([]);

  // redux use
  const {
    todaysSteps,
    nutrition,
    goal: { totalSteps, totalCalorie },
  } = useAppSelector((state) => state.health.value);

  // state dependent constants
  const stepsCompletionPercentage = ~~getPercentage(todaysSteps, totalSteps);
  const pieData = [
    { value: stepsCompletionPercentage, color: COLORS.PRIMARY.PURPLE },
    { value: 100 - stepsCompletionPercentage, color: COLORS.SECONDARY.WHITE },
  ];

  // effect use
  useEffect(() => {
    if (Platform.OS === "ios") {
      AppleHealthKit.getActiveEnergyBurned(
        {
          startDate: todayMidnight.toISOString(),
          endDate: today.toISOString(),
          includeManuallyAdded: true,
        },
        (err, results) => {
          if (err || results.length === 0) {
            return;
          }
          setLineData(
            results
              .slice(0)
              .reverse()
              .map((val) => ({
                ...val,
                value: Math.ceil(getPercentage(val.value, totalCalorie)),
              }))
          );
        }
      );
    }
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
          yAxisLabelSuffix="%"
          yAxisOffset={-2}
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
        />
      </View>
      <View style={SPACING.mV3}>
        <PerformanceCard
          icon={ICONS.SmileyGood({ width: 20, height: 20 })}
          onDay="Wednesday"
          value={"40"}
          performanceText="Best Performance"
        />
        <PerformanceCard
          icon={ICONS.SmileyBad({ width: 20, height: 20 })}
          onDay="Wednesday"
          value={"40"}
          performanceText="Best Performance"
        />
      </View>
    </ScrollView>
  );
};

export default DailySteps;
