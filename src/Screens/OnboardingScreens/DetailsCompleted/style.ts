import {StyleSheet} from 'react-native';
import {COLORS, SIZES, SPACING} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: '#7150C5',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  childCtr: {
    alignItems: 'center',
  },
  logoCtr: {
    backgroundColor: COLORS.SECONDARY.WHITE,
    borderRadius: 200,
    padding: 15,
  },
  titleText: {
    color: COLORS.SECONDARY.WHITE,
    fontSize: SIZES.fontH5,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.REGULAR,
    textAlign: 'center',
    marginTop: 48,
  },
  titleDescriptionText: {
    color: COLORS.SECONDARY.WHITE,
    fontSize: SIZES.font12,
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: SIZES.fontBold2,
    textAlign: 'center',
    ...SPACING.mt1,
  },
  arrowCtr: {
    ...SPACING.mt4,
    minHeight: 40,
    justifyContent: 'center',
  },
});
