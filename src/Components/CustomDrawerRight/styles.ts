import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  parent: {
    right: RFValue(10),
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 200 },
});
