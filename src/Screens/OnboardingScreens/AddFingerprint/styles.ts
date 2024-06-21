import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";
import { FONT_FAMILY } from "../../../Constants/commonStyles";

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
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: SIZES.fontBold1,
    ...SPACING.mt1,
  },
  customButtonParentStyle: {
    marginTop: 88,
  },
  notNowParent: {
    backgroundColor: "",
  },
  notNowText: {
    color: COLORS.PRIMARY.PURPLE,
    ...SPACING.mt4,
  },
});
