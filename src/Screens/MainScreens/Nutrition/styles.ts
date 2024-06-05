import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.DARK_GREY,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
    // ...SPACING.mt5,
    ...SPACING.mh2,
  },
  pieChart: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    minWidth: 250,
  },
  childCtr: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    ...SPACING.mt4,
  },
  line: {
    borderWidth: 1,
    marginHorizontal: 10,
    borderColor: "#DCDDE0",
  },
  statisticsCtr: {},
  foodCtr: {},
});
