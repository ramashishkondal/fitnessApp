import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    ...SPACING.mt3,
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: SIZES.rounding2,
    padding: 16,
    paddingVertical: 20,
  },
  childCtr: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.SECONDARY.LIGHT_GREY,
  },
  titleCtr: {},
  titleText: {
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    paddingBottom: 8,
    color: 'black',
    fontFamily: FONT_FAMILY.REGULAR,
  },
  productTitleText: {
    fontSize: SIZES.fontH6,
    fontFamily: FONT_FAMILY.MEDIUM,
    color: 'black',
  },
  quantityText: {
    color: COLORS.SECONDARY.GREY,
    ...SPACING.mt1,
    fontWeight: SIZES.fontBold1,
    fontFamily: FONT_FAMILY.REGULAR,
  },
  caloriesText: {
    fontFamily: FONT_FAMILY.REGULAR,
    fontSize: SIZES.font14,
    color: 'black',
  },
  childCtrTop: {
    borderTopWidth: 1.5,
  },
  closeCtr: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
