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
  titleText: {
    fontSize: SIZES.fontH3,
    fontWeight: SIZES.fontBold1,
    marginHorizontal: 36,
    ...SPACING.mt1,
  },
  descriptionText: {
    fontSize: SIZES.font12,
    marginRight: RFValue(40),
    marginHorizontal: 36,
    fontFamily: FONT_FAMILY.MEDIUM,
    ...SPACING.mt2,
    color: 'black',
  },
  detailsText: {
    color: COLORS.PRIMARY.PURPLE,
    fontWeight: SIZES.fontBold0,
    fontSize: SIZES.font13,
    marginHorizontal: 36,
    fontFamily: FONT_FAMILY.REGULAR,
    ...SPACING.mt3,
  },
  catageroiesCtr: {
    ...SPACING.mt3,
  },
  headingText: {
    marginHorizontal: 36,
  },
});
