import { RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    right: RFValue(10),
    justifyContent: "center",
  },
  image: { width: 60, height: 60, borderRadius: 200 },
});
