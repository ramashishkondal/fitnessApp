// libs
import React, { useMemo } from "react";
import { View, Text } from "react-native";

// custom
import {
  CustomGlass,
  DataInfoCompare,
  PerformanceCard,
} from "../../../Components";
import { useAppDispatch, useAppSelector } from "../../../Redux/Store";
import { updateHealthData } from "../../../Redux/Reducers/health";
import { ICONS } from "../../../Constants";
import { styles } from "./styles";
import WarningLabel from "./atoms/WarningLabel";

const simleySize = {
  width: 21,
  height: 21,
};

const WaterIntake = () => {
  const {
    waterIntake,
    goal: { noOfGlasses },
  } = useAppSelector((state) => state.health.value);
  const dispatch = useAppDispatch();
  const glasses = useMemo(
    () =>
      Array(noOfGlasses)
        .fill(true, 0, waterIntake + 1)
        .fill(false, waterIntake),
    [waterIntake]
  );
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
        onDay="Monday"
        value={10}
      />
      <PerformanceCard
        icon={ICONS.SmileyBad(simleySize)}
        performanceText="Worst Performance"
        onDay="Sunday"
        value={2}
      />
    </View>
  );
};

export default WaterIntake;
