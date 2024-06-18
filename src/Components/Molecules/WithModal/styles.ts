import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    marginHorizontal: 16,
    marginVertical: SIZES.width / 7,
    top: SIZES.height / 40,
    borderRadius: SIZES.rounding2,
  },
  modalCtr: {
    flex: 10,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
  },
  horizontalLineCtr: {
    flex: 1,
    marginTop: 24,
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
