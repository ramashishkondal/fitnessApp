import { StyleSheet } from "react-native";
import { SIZES, COLORS } from "../../../Constants";
import { FONT_FAMILY } from "../../../Constants/commonStyles";

export const styles = StyleSheet.create({
  text: {
    fontSize: SIZES.font13,
    color: COLORS.SECONDARY.GREY,
    textAlign: "center",
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});
