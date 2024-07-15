import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.DARK_GREY,
  },
  warningText: {
    padding: 16,
  },
  descriptionText: {
    fontSize: SIZES.font12,
    marginRight: RFValue(40),
    marginHorizontal: 36,
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    fontWeight: '400',
    ...SPACING.mt2,
    color: 'black',
  },
  detailsText: {
    color: COLORS.PRIMARY.PURPLE,
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    fontWeight: '800',
    fontSize: SIZES.font13,
    marginHorizontal: 36,
    ...SPACING.mt3,
  },
  catageroiesCtr: {
    ...SPACING.mt3,
  },
  headingText: {
    marginHorizontal: 36,
  },
});
