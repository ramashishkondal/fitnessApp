import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants/commonStyles";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY.PURPLE,
    height: RFValue(42),
    width: RFValue(225),
    borderRadius: SIZES.rounding3,
  },
  buttonCtr: {},
  text: {
    color: COLORS.SECONDARY.WHITE,
    fontSize: SIZES.fontH7,
    fontWeight: SIZES.fontBold1,
  },
});
