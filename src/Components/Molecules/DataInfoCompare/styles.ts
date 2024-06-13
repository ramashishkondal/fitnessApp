import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants";
import { RFValue } from "react-native-responsive-fontsize";
export const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  leftCtr: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: COLORS.SECONDARY.GREY,
    paddingLeft: "10%",
    // alignItems: "center",
  },
  rightCtr: {
    flex: 1,
    // alignItems: "center",
    paddingRight: "10%",
    alignItems: "flex-end",
  },
  mainInfoText: {
    fontSize: SIZES.font17,
    fontWeight: SIZES.fontBold2,
  },
  descriptionText: {
    color: COLORS.SECONDARY.GREY,
    fontWeight: SIZES.fontBold2,
    fontSize: RFValue(12),
  },
});
