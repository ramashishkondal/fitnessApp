import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  leftCtr: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: COLORS.SECONDARY.GREY,
    ...SPACING.mh2,
  },
  rightCtr: {
    flex: 1,
  },
  mainInfoText: {
    fontSize: SIZES.font15,
    fontWeight: SIZES.fontBold2,
  },
  descriptionText: {
    color: COLORS.SECONDARY.GREY,
    fontWeight: SIZES.fontBold2,
  },
});
