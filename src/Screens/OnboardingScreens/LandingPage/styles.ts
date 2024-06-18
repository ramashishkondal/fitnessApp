import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants/commonStyles";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    alignItems: "center",
  },
  titleText: { fontSize: SIZES.fontH5, fontWeight: SIZES.fontBold0 },
  titleDescriptionText: {
    fontSize: SIZES.font13,
    color: COLORS.SECONDARY.GREY,
    textAlign: "center",
    width: RFValue(250),
  },
  image: {
    width: RFValue(310),
    height: RFValue(210),
    ...SPACING.mt2,
  },
  signInText1: {
    color: COLORS.SECONDARY.GREY,
    fontSize: SIZES.font14,
  },
  signInText2: {
    fontSize: SIZES.font14,
    color: COLORS.PRIMARY.PURPLE,
    fontWeight: SIZES.fontBold0,
  },
});
