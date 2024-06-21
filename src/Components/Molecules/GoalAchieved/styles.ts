import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants";

export const styles = StyleSheet.create({
  parent: { flex: 1 },
  headingCtr: {
    marginVertical: 32,
  },
  childCtrTop: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.PURPLE,
    borderRadius: 10,
  },
  childCtrBottom: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    borderRadius: 10,
  },
  cardCtr: {
    position: "absolute",
    alignSelf: "center",
    // justifyContent: "center",
    // backgroundColor: COLORS.SECONDARY.RED,
    height: "100%",
    width: "100%",
  },
  card: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    marginHorizontal: 32,
    borderRadius: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
    margin: 16,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  dataCtr: {
    alignItems: "center",
    paddingVertical: 40,
  },
});
