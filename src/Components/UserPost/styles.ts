import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../Constants";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: 20,
    marginBottom: 16,
  },
  userInfoCtr: {
    flexDirection: "row",
    marginTop: 10,
  },
  likesAndCommentsCtr: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 8,
    alignItems: "center",
  },
  userTextCtr: {
    marginHorizontal: 10,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 200,
  },
  photo: {
    width: "100%",
    minHeight: 300,
    maxHeight: 400,
    borderRadius: SIZES.rounding2,
  },
  likesText: {
    marginHorizontal: 8,
    color: COLORS.SECONDARY.GREY,
    fontWeight: SIZES.fontBold0,
    fontSize: SIZES.font12,
  },
  captionText: { marginVertical: 10 },
  userNameText: {
    fontWeight: SIZES.fontBold1,
  },
  likeCtr: {
    flex: 1,
    flexDirection: "row",
  },
  commentCtr: {
    flex: 4.5,
    flexDirection: "row",
  },
});
