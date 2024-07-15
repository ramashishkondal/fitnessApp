import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY.LIGHT_GREY,
    paddingHorizontal: 24,
  },
  titleText: {
    fontSize: SIZES.fontH3,
    fontWeight: '700',
    fontFamily: FONT_FAMILY.EXTRA_BOLD,
    color: 'black',
  },
  editProfileCtr: {
    marginTop: 16,
  },
});
