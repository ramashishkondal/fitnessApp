import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    marginHorizontal: 16,
    borderWidth: 3,
    borderColor: COLORS.PRIMARY.PURPLE,
    padding: 2,
    borderRadius: 200,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 200,
  },
});
