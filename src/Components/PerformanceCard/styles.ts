import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 10,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  performanceCtr: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  iconCtr: { justifyContent: "center", flex: 1 },
  titleAndDescContainer: {
    flex: 6,
  },
  descTitleText: {
    fontSize: SIZES.font17,
  },
  descText: {
    color: COLORS.SECONDARY.GREY,
    fontSize: SIZES.font12,
    fontWeight: SIZES.fontBold2,
  },
  valueText: {
    fontSize: SIZES.font17,
    flex: 1,
    textAlign: "right",
  },
});
