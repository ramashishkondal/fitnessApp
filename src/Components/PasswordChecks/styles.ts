import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
  },
  childCtr: {
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
  },
  square: {
    backgroundColor: "#D6D9E0",
    width: 15,
    height: 15,
    borderRadius: SIZES.rounding0,
    marginHorizontal: 8,
  },
  squareChecked: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
  },
  text: {
    fontSize: SIZES.font12,
    color: "#A9ABC2",
  },
});
