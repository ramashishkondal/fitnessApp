import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    // borderWidth: 1,
    flexDirection: "row",
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: 11,
    minWidth: 130,
  },
  child: {
    // borderWidth: 1,
  },
  iconCtr: {
    // borderWidth: 1,
    // padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: SIZES.font14,
    fontWeight: SIZES.fontBold0,
  },
  checkboxCtr: {
    width: 8,
    // position: "absolute",
    // borderWidth: 1,
    alignItems: "center",
    // right: 20,
  },
});
