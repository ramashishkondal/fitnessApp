import { StyleSheet } from "react-native";
import { COLORS } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY.DARK_GREY,
  },
  allDetailsCtr: {
    flexDirection: "row",
  },
  iconCtr: {},
  childCtr: { flexDirection: "column" },
  detailsCtr: { flexDirection: "column" },
  upperCtr: { flexDirection: "row" },
  textCtr: {},
  buttonCtr: {},
  lineCtr: {},
});
