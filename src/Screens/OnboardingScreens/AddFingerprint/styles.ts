import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    ...SPACING.mh2,
    ...SPACING.mt3,
  },
  iconCtr: {
    ...SPACING.mt5,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    ...SPACING.mt3,
  },
  titleDescriptionText: {
    fontSize: SIZES.font12,
    fontWeight: SIZES.fontBold2,
    color: "#AFB1C7",
    textAlign: "center",
    ...SPACING.mt1,
  },
  notNowText: {
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.fontH7,
    fontWeight: SIZES.fontBold0,
    ...SPACING.mt4,
  },
});
