import {StyleSheet} from 'react-native';
import {COLORS, FONT_FAMILY, SIZES} from '../../../Constants/commonStyles';
import {RFValue} from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY.PURPLE,
    paddingHorizontal: 104,
    paddingVertical: 14,
    minHeight: RFValue(40),
    minWidth: RFValue(240),

    borderRadius: SIZES.rounding3,
  },
  buttonCtr: {},
  text: {
    color: COLORS.SECONDARY.WHITE,
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: SIZES.fontH6,
    fontWeight: SIZES.fontBold0,
  },
});
