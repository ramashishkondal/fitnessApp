import {StyleSheet} from 'react-native';
import {
  COLORS,
  FONT_FAMILY,
  SIZES,
  SPACING,
} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  parent: {
    // flex: 1,
    alignItems: 'center',
  },
  titleText: {fontSize: SIZES.fontH5, fontWeight: SIZES.fontBold0},
  titleDescriptionText: {
    fontSize: SIZES.font13,
    color: COLORS.SECONDARY.GREY,
    textAlign: 'center',
    width: RFValue(250),
  },
  image: {
    width: '100%',
    height: 245,
    ...SPACING.mt2,
  },
  signInText1: {
    color: COLORS.SECONDARY.GREY,
    fontSize: SIZES.font14,
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    fontWeight: '500',
  },
  signInText2: {
    fontSize: SIZES.font14,
    color: COLORS.PRIMARY.PURPLE,
    fontWeight: SIZES.fontBold0,
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
  },
  signInTextCtr: {
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInInsteadCtr: {
    flexDirection: 'row',
  },
});
