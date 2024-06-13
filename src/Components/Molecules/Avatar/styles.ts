import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../../Constants/commonStyles";

export const styles = StyleSheet.create({
  avatarCtr: {
    ...SPACING.mhMedium,
  },
  avatarSelected: {
    borderColor: COLORS.PRIMARY.PURPLE,
    borderWidth: 2,
    borderRadius: 200,
  },
});
