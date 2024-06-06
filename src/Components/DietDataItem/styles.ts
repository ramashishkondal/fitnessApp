import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    ...SPACING.mt3,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: 16,
    paddingVertical: 20,
  },
  childCtr: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  titleCtr: {},
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    paddingBottom: 8,
  },
  productTitleText: {
    fontSize: SIZES.fontH6,
  },
  quantityText: {
    color: COLORS.SECONDARY.GREY,
    ...SPACING.mt1,
    fontWeight: SIZES.fontBold1,
  },
  caloriesText: {
    fontSize: SIZES.font14,
  },
});
