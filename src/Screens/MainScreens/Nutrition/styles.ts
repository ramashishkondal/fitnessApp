import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.DARK_GREY,
  },
  titleText: {},
  pieChart: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  childCtr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    ...SPACING.mt4,
  },
  statisticsCtr: {},
  foodCtr: {},
});
