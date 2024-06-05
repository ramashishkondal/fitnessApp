import { StyleSheet } from "react-native";
import { SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flexDirection: "row",
    paddingVertical: 15,
    alignItems: "center",
  },
  colorCtr: {
    borderRadius: 100,
    width: 15,
    height: 15,
  },
  text: {
    paddingHorizontal: 5,
    color: "#C0BBFC",
    fontWeight: SIZES.fontBold1,
  },
});
