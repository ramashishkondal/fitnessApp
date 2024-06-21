import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";
import { RFValue } from "react-native-responsive-fontsize";
import { FONT_FAMILY } from "../../../Constants/commonStyles";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    width: "100%",
    ...SPACING.mt3,
  },
  childCtr: {
    paddingVertical: RFValue(17),
    paddingHorizontal: RFValue(10),
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
  },
  textCtr: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: SIZES.font12,
    fontFamily: FONT_FAMILY.REGULAR,
  },
});
