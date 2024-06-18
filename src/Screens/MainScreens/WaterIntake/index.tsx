// libs
import React, { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";

// custom
import {
  CustomGlass,
  DataInfoCompare,
  PerformanceCard,
  WarningLabel,
} from "../../../Components";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { updateHealthData } from "../../../Redux/Reducers/health";
import { COLORS, ICONS } from "../../../Constants";
import { styles } from "./styles";
import { getHealthData } from "../../../Utils/userUtils";
import {
  checkWeek,
  date,
  getPercentage,
  weekday,
} from "../../../Utils/commonUtils";

const simleySize = {
  width: 21,
  height: 21,
  color: COLORS.SECONDARY.ORANGE,
};

const WaterIntake: React.FC = () => {
  // constants
  const today = date.today();

  // state use
  const [rating, setRating] = useState<{
    best: { value: number; week: string };
    worst: { value: number; week: string };
  }>();

  // redux use
  const {
    waterIntake,
    goal: { noOfGlasses },
  } = useAppSelector((state) => state.health.value);
  const { id } = useAppSelector((state) => state.User.data);
  const dispatch = useAppDispatch();

  // effect use
  useEffect(() => {
    getHealthData(id!).then((healthData) => {
      if (healthData) {
        const filteredData = healthData.filter((val) =>
          checkWeek(val.currentDate.toDate(), today)
        );
        const bestWaterIntakeDay = filteredData.reduce(
          (acc, val) => {
            if (
              Math.ceil(
                getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10
              ) >= acc.value
            ) {
              return {
                value: Math.ceil(
                  getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10
                ),
                week: weekday[val.currentDate.toDate().getDay()],
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
                getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10
              ) <= acc.value
            ) {
              return {
                value: Math.ceil(
                  getPercentage(val.waterIntake, val.goal.noOfGlasses) / 10
                ),
                week: weekday[val.currentDate.toDate().getDay()],
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
    });
  }, []);

  // memo use
  const glasses = useMemo(
    () =>
      Array(noOfGlasses)
        .fill(true, 0, waterIntake + 1)
        .fill(false, waterIntake),
    [waterIntake]
  );

  // functions
  const handleGlassDrank = () => {
    dispatch(updateHealthData({ waterIntake: waterIntake + 1 }));
  };
  const handleGlassEmpty = () => {
    dispatch(updateHealthData({ waterIntake: waterIntake - 1 }));
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.titleText}>
        You drank{" "}
        <Text style={styles.highlightedText}>{waterIntake} glasses</Text> today
      </Text>
      <View style={styles.glassesCtr}>
        {glasses.map((val, i) => {
          return (
            <CustomGlass
              isFilled={val}
              handleOnPress={handleGlassDrank}
              handleDelete={handleGlassEmpty}
              key={i}
            />
          );
        })}
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
        {waterIntake < noOfGlasses ? <WarningLabel /> : null}
      </View>
      <PerformanceCard
        icon={ICONS.SmileyGood(simleySize)}
        performanceText="Best Performance"
        onDay={rating?.best.week ?? "No Data"}
        value={rating?.best.value ?? 0}
      />
      <PerformanceCard
        icon={ICONS.SmileyBad(simleySize)}
        performanceText="Worst Performance"
        onDay={rating?.worst.week ?? "No data"}
        value={rating?.worst.value ?? 0}
      />
    </View>
  );
};

export default WaterIntake;
