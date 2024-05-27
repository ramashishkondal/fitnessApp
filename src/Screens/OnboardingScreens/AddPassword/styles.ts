import { StyleSheet } from "react-native";
import { SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
  },
  titleCtr: {
    maxWidth: 320,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
  },
  textInput: {
    textAlign: "center",
  },
});
