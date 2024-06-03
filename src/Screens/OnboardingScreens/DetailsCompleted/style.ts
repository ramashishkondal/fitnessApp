import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#7150C5",
    justifyContent: "center",
    paddingHorizontal: 48,
  },
  childCtr: {
    alignItems: "center",
  },
  logoCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: 200,
    padding: 15,
  },
  titleText: {
    color: COLORS.SECONDARY.WHITE,
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
    ...SPACING.mt5,
  },
  titleDescriptionText: {
    color: COLORS.SECONDARY.WHITE,
    fontSize: SIZES.font12,
    fontWeight: SIZES.fontBold2,
    textAlign: "center",
    ...SPACING.mt1,
  },
  arrowCtr: {
    ...SPACING.mt4,
  },
});
