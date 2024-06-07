import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    // alignItems: "center",
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    textAlign: "center",
    ...SPACING.mh3,
    marginBottom: 24,
  },
  stepCountText: {
    color: COLORS.PRIMARY.PURPLE,
  },
});
