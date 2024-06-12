import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  child: {
    flex: 1,
    borderRadius: 200,
    alignItems: "center",
    paddingTop: 7,
  },
  iconCtr: {
    borderRadius: 200,
    padding: 20,
    backgroundColor: COLORS.SECONDARY.WHITE,
  },
  iconCtrSelected: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
  },
  textCtr: {
    marginVertical: 20,
  },
  text: {
    fontSize: SIZES.font12,
  },
});
