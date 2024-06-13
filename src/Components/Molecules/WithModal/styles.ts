import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    paddingVertical: "15%",
    paddingHorizontal: "5%",
  },
  modalContent: {
    flex: 1,
  },
  modalCtr: {
    minWidth: "100%",
    minHeight: "100%",
    backgroundColor: COLORS.SECONDARY.WHITE,
    // paddingVertical: 16,
  },
  iconsCtr: {
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  horizontalLineCtr: {
    alignItems: "center",
  },
  horizontalLine: {
    backgroundColor: "#CBD7E1",
    width: "45%",
    height: 5,
    borderRadius: SIZES.rounding3,
    alignSelf: "center",
  },
});
