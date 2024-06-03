import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#ECECEC",
  },
  titleText: {
    fontSize: SIZES.fontH3,
    fontWeight: SIZES.fontBold1,
    marginHorizontal: 24,
    ...SPACING.mt1,
  },
  descriptionText: {
    fontSize: SIZES.font12,
    marginRight: RFValue(40),
    marginHorizontal: 24,
    ...SPACING.mt2,
  },
  detailsText: {
    color: COLORS.PRIMARY.PURPLE,
    fontWeight: SIZES.fontBold1,
    fontSize: SIZES.font12,
    marginHorizontal: 24,
    ...SPACING.mt3,
  },
});
