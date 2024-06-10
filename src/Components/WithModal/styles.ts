import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  modalCtr: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: COLORS.SECONDARY.WHITE,
    alignItems: "center",
  },
  iconsCtr: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  horizontalLineCtr: {
    alignItems: "center",
  },
  horizontalLine: {
    backgroundColor: "#CBD7E1",
    width: "45%",
    height: 5,
    borderRadius: SIZES.rounding3,
  },
});
