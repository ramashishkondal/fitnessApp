import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../../Constants/commonStyles";

export const styles = StyleSheet.create({
  avatarCtr: {
    marginHorizontal: 16,
  },
  avatarSelected: {
    borderColor: COLORS.PRIMARY.PURPLE,
    borderWidth: 5,
    borderRadius: 200,
  },
});
