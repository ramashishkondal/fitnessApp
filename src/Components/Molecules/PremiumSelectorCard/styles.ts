import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    // width: SIZES.width,
    paddingVertical: 20,
    backgroundColor: COLORS.PRIMARY.GREY,
    borderRadius: SIZES.rounding2,
    marginTop: 24,
  },
  selectorCtr: {
    flexDirection: 'row',
  },
  priceCtr: {
    marginLeft: 16,
  },
  freeTrialCtr: {
    backgroundColor: COLORS.PRIMARY.LIGHT_PURPLE,
    paddingVertical: 10,
    borderRadius: 16,
    paddingHorizontal: 20,
  },
  freeTrialtext: {
    fontFamily: FONT_FAMILY.BOLD,
    color: COLORS.PRIMARY.PURPLE,
    fontSize: SIZES.font13,
  },
  priceText: {
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: SIZES.font15,
  },
  outOfText: {
    fontFamily: FONT_FAMILY.MEDIUM,
    fontSize: SIZES.font12,
  },
});
