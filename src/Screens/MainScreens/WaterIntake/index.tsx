// libs
import React, { useMemo } from "react";
import { View, Text } from "react-native";

// custom
import { CustomGlass, DataInfoCompare } from "../../../Components";
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
        {glasses.map((val) => {
          return (
            <CustomGlass
              isFilled={val}
              handleOnPress={handleGlassDrank}
              handleDelete={handleGlassEmpty}
            />
          );
        })}
      </View>
      <View>
        <DataInfoCompare
          glassesDrank={waterIntake}
          totalGlasses={noOfGlasses}
        />
        {waterIntake < noOfGlasses ? <WarningLabel /> : null}
      </View>
      <View style={styles.performanceCtr}>
        <View style={styles.bestPerformanceCtr}>
          <View style={styles.iconCtr}>{ICONS.SmileyGood(simleySize)}</View>
          <View style={styles.titleAndDescContainer}>
            <Text style={styles.descTitleText}>Best Performance</Text>
            <Text style={styles.descText}>Monday</Text>
          </View>
          <Text style={styles.valueText}>10</Text>
        </View>
        <View style={styles.worstPerformanceCtr}>
          <View style={styles.iconCtr}>{ICONS.SmileyBad(simleySize)}</View>
          <View style={styles.titleAndDescContainer}>
            <Text style={styles.descTitleText}>Worst Performance</Text>
            <Text style={styles.descText}>Sunday</Text>
          </View>
          <Text style={styles.valueText}>6</Text>
        </View>
      </View>
    </View>
  );
};

export default WaterIntake;
