import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../../Constants';
import {FONT_FAMILY} from '../../../Constants/commonStyles';

export const styles = StyleSheet.create({
  parent: {
    backgroundColor: COLORS.PRIMARY.PURPLE,
    justifyContent: 'center',
    padding: 4,
    // paddingHorizontal: 24,
    marginHorizontal: 16,
    borderRadius: SIZES.rounding0,
    marginBottom: 30,
  },
  parent1: {
    // left: '50%',
  },
  text: {
    color: 'white',
    fontFamily: FONT_FAMILY.MEDIUM,
  },
});
