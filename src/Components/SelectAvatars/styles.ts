import { RFValue } from "react-native-responsive-fontsize";
import { SPACING } from "./../../Constants/commonStyles";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  avatarCtr: {
    ...SPACING.mhMedium,
  },
  flatListSyle: { maxHeight: RFValue(100), paddingTop: 9 },
});
