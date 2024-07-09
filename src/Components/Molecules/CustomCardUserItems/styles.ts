import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    padding: 12,
    borderRadius: SIZES.rounding3,
    backgroundColor: COLORS.PRIMARY.LIGHT_PURPLE,
  },
  text: {
    marginBottom: 3,
    color: COLORS.PRIMARY.PURPLE,
    fontFamily: FONT_FAMILY.REGULAR,
    fontWeight: '700',
    fontSize: SIZES.font12,
  },
});
