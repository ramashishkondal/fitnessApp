import { COLORS } from "./../../Constants/commonStyles";
import { StyleSheet } from "react-native";
import { SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    maxWidth: "100%",
    justifyContent: "space-between",
    flex: 1,
  },
  titleText: {
    fontSize: SIZES.fontH6,
    fontWeight: SIZES.fontBold1,
    marginVertical: 24,
  },
  image: {
    height: SIZES.height / 2,
    width: "100%",
    borderRadius: SIZES.rounding2,
  },
  captionText: { marginTop: 8, fontSize: SIZES.font13 },
  textInput: { marginVertical: 10 },
  footerCtr: {
    flexDirection: "row",
    borderTopWidth: 1,
    marginHorizontal: 8,
    borderColor: COLORS.SECONDARY.GREY,
    padding: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 60,
  },
  iconsCtr: { marginHorizontal: 8 },
  buttonParentStyle: {
    maxWidth: SIZES.width / 4,
    maxHeight: SIZES.height / 22,
  },
});
