import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.DARK_GREY,
  },
  titleText: {
    fontSize: SIZES.fontH3,
    fontWeight: SIZES.fontBold1,
    marginHorizontal: 24,
  },
});
