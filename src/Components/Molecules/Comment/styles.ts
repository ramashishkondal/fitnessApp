import { StyleSheet } from "react-native";
import { SIZES } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  userInfoCtr: {
    flexDirection: "row",
    marginTop: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  userTextCtr: {
    marginHorizontal: 10,
  },
  userNameText: {
    fontWeight: SIZES.fontBold1,
  },
});
