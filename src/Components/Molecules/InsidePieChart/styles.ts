import { StyleSheet } from "react-native";
import { SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
    fontWeight: SIZES.fontBold0,
  },
  dailyGoalText: { fontSize: 16, fontWeight: SIZES.fontBold2 },
});
