import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../Constants/commonStyles";

export const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    height: 45,
    borderRadius: SIZES.rounding2,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  iconCtr: {
    flex: 1,
    marginLeft: 4,
    minWidth: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 19,
    flexDirection: "row",
    paddingHorizontal: 15,
    fontSize: SIZES.font13,
  },
});
