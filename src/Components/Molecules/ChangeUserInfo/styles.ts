import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  genderCtr: {
    flexDirection: "row",
    marginTop: 38,
  },
  genderCardsCtr: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
