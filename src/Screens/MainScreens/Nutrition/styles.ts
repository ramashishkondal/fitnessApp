import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
  },
  calorieText: {
    color: COLORS.PRIMARY.PURPLE,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    textAlign: "center",
    ...SPACING.mh2,
  },
  pieChart: {
    justifyContent: "center",
    alignItems: "center",
    minWidth: 250,
  },
  childCtr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    ...SPACING.mt4,
    marginBottom: 16,
  },
  line: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  statisticsCtr: {},
  foodCtr: {},
});
