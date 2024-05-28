import { StyleSheet } from "react-native";
import { SIZES, SPACING } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 25,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
    ...SPACING.mt2,
    ...SPACING.mh2,
  },
  titleDescriptionText: {
    fontSize: SIZES.font13,
    fontWeight: SIZES.fontBold2,
    color: "#AFB1C7",
    textAlign: "center",
    ...SPACING.mt1,
    paddingHorizontal: 25,
    marginBottom: 5,
  },
});
