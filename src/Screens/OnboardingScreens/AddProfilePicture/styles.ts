import { StyleSheet } from "react-native";
import { COLORS, SIZES, SPACING } from "../../../Constants";
import { RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.GREY,
    alignItems: "center",
  },
  photo: {
    height: RFValue(65),
    width: RFValue(65),
    borderRadius: 200,
    marginTop: 9,
    marginBottom: 38,
  },
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold1,
    textAlign: "center",
    ...SPACING.mh2,
  },
  titleDescriptionText: {
    ...SPACING.mt1,
    paddingHorizontal: 25,
    ...SPACING.mh2,
  },
  buttonParentStyle: {
    marginTop: 72,
  },
  addPhotoText: {
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.fontH7,
    fontWeight: SIZES.fontBold0,
    ...SPACING.mt2,
    ...SPACING.mh2,
  },
});
